/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/question/:quesId',
      load: () =>
        import(/* webpackChunkName: 'questionPage' */ './questionPage'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    // {
    //   path: '/register',
    //   load: () => import(/* webpackChunkName: 'register' */ './register'),
    // },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Pelvan'}`;
    route.description = route.description || '';

    return route;
  },
};

export default routes;
