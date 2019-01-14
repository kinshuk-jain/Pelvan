import ReactDOM from 'react-dom/server';
import React from 'react';
import memoize from 'memoizee';
import Html from './components/Html';

// important to cache as this method is expensive
const html = (path, data) => ReactDOM.renderToStaticMarkup(<Html {...data} />);
const memoized = memoize(html, { length: 1, maxAge: 20000 });

export default function cached(path, data) {
  if (path) {
    const result = memoized(path, data);
    if (result) {
      return result;
    }
    memoized.delete(path, true);
    return null;
  }
  return data ? html(path, data) : null;
}
