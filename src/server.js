import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
// import Html from '../src/components/Html';
import createFetch from './createFetch';
import router from './router';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import cached from './cached';

let noAccessStream = false;
let noServerStream = false;
const REQUEST_TIMEOUT = 20000;
const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// add a timeout of 20s to every request
app.use((req, res, next) => {
  req.setTimeout(REQUEST_TIMEOUT, () => {
    res.set('Connection', 'Close');
    next({ code: 408, name: 'Server Timeout', message: 'Request timed out' });
  });
  next();
});

/**
 * Register Node.js middleware
 */
app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxAge: 31536000,
    etag: false,
  }),
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

if (__DEV__) {
  app.enable('trust proxy');
}

/**
 * Setup the logging middleware
 */

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  },
);

const serverCrashLogStream = fs.createWriteStream(
  path.join(__dirname, 'crash.log'),
  {
    flags: 'a',
  },
);

// log everything to access.log in prod. Can be fed to tools like splunk, data dog, etc
app.use(
  morgan(
    'combined',
    noAccessStream || __DEV__ ? {} : { stream: accessLogStream },
  ),
);

// if in dev mode, log only errors to console
if (__DEV__) {
  app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode < 400,
    }),
  );
}

/**
 * Register server-side rendering middleware
 */

app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    const fontCss = new Set();

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      insertFontCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => fontCss.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      pathname: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
      { id: 'fontCss', cssText: [...fontCss].join('') },
    ];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    // const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    const cachedHTML = cached(req.path, data);
    res.status(route.status || 200);
    res.send(`<!doctype html>${cachedHTML}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// when server crashes log before it shuts down
process.on('uncaughtException', err => {
  console.error(pe.render(err));
  // logs all server crashes to crash.log
  // TODO: Setup nodemailer to send mails when this happens
  morgan(() => err, noServerStream ? {} : { stream: serverCrashLogStream });
  process.exit(1);
});

accessLogStream.on('error', err => {
  console.error(pe.render(err));
  // output all logs to console.
  // TODO: Setup nodemailer to send mails when this happens
  noAccessStream = true;
});

serverCrashLogStream.on('error', err => {
  console.error(pe.render(err));
  // output all logs to console
  // TODO: Setup nodemailer to send mails when this happens
  noServerStream = true;
});

/**
 * Launch the server
 */

if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

/**
 * Hot Module Replacement
 */

if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
