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

const app = express();

//
// Setup the logger
// -----------------------------------------------------------------------------

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  },
);

// logs all requests to access.log
app.use(morgan('combined', { stream: accessLogStream }));

// logs only error to console
app.use(
  morgan('combined', {
    skip(req, res) {
      return res.statusCode < 400;
    },
  }),
);

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

// function sendGzippedAsset(contentType) {
//   // eslint-disable-next-line func-names
//   return function(req, res, next) {
//     if (__DEV__ || !req.acceptsEncodings('gzip')) return next();
//     req.url = `${req.url}.gz`;
//     res.type(contentType);
//     res.set('Content-Encoding', 'gzip');
//     return next();
//   };
// }

// execute gzip middleware for all static assets
// app.use('*.js($|\\?*$)', sendGzippedAsset('application/javascript'));
// app.use('*.css($|\\?*$)', sendGzippedAsset('text/css'));
// app.use('*.woff($|\\?*$)', sendGzippedAsset('font/woff'));
// app.use('*.ttf($|\\?*$)', sendGzippedAsset('font/ttf'));

app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxAge: '1y',
  }),
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
// app.use(
//   expressJwt({
//     secret: config.auth.jwt.secret,
//     credentialsRequired: false,
//     getToken: req => req.cookies.id_token,
//   }),
// );
// // Error handler for express-jwt
// app.use((err, req, res, next) => {
//   // eslint-disable-line no-unused-vars
//   if (err instanceof Jwt401Error) {
//     console.error('[express-jwt-error]', req.cookies.id_token);
//     // `clearCookie`, otherwise user can't use web-app until cookie expires
//     res.clearCookie('id_token');
//   }
//   next(err);
// });

if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
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

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
