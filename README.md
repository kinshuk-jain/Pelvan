## Pelvan - A simple project

This project sits behind a nginx reverse proxy. It adds support for:

- adding Content-Type HTTP header,
- redirect from http to https
- communicate over https
- serve over http /2 if supported by client
- serve compressed static resources

*D0 NOT add these features in current project as nginx handles these for us.*
*DO NOT use this app for anything other than serving react app. NO API calls*

### To run service behind nginx

- ```nginx start```
- ```yarn run start```
- go to https://localhost:4433 in your browser

### To build with a dev server running

```yarn run start```

### To generate HTML files

This will generate HTML file for all routes in the app. Useful to see what each HTML file looks like

```yarn run render```

### To build for production

```yarn run build```

### To build dev bundles

```yarn run build:local```

### Run in production mode locally

```yarn run start:prod```

### For linting

```yarn run lint```

### For deploying

```yarn run deploy``` (need to edit this script depending on the server)

### For running tests

```yarn run test```

### Running service on production servers

- Setup nginx
- Make sure you deploy production build to the server with `yarn run deploy`
- Run on prod server as `NODE_ENV=production node ./server.js`


### Application Structure -

```
|-- build: compiled files
|
|-- docs: docs on how to implement things in this project. // TODO: Move to a new repo
|
|-- functions: Firebase function. Contains everything that must go to firebase
|
|-- tools: deploy scripts and webpack config
|   |
|   |-- clean.js: clean build folder
|   |-- bundle.js: create bundles
|   |-- build.js: run webpack build
|   |-- copy.js: copy static assets like text files and icons to build folder
|   |-- postcss.config.js: self-explanatory
|   |-- render.js: List all routes that are only static pages. Webpack optimizes these
|
|-- src: source code
|   |
|   |-- actions: actions common to more than 2 components
|   |-- reducers: reducers common to more than 2 components
|   |-- selectors: selectors common to more than 2 components
|   |-- components: self-explanatory
|   |   |-- Container: Container components
|   |   |-- Components: Presentational components
|   |   |-- State: State for this Pod
|   |   |-- Data: all json files, fetch calls whether in actions or otherwise
|   |-- constants: application wide constants
|   |-- core: application wide utility functions
|   |-- fonts: app fonts
|   |-- store: redux store
|   |-- commonStyles: application wide CSS
|   |-- routes: Route bases classification of components
|   |   |-- [route]: route name. Ex for http://app.com/home. This will be `home`

```

### TODOS

- Add loading spinner
- Add placeholder for loading pages
- Add compare trainers feature
