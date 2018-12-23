Pelvan - A simple project



To build with a dev server running -

```yarn run start```



To only build -

```yarn run build```



To build for production -

```yarn run build --release```



Run in production mode -

```yarn start -- --release```



FOr linting -

```yarn run lint```



for deploying -

```yarn run deploy``` (need to edit this script depending on the server)



for running tests -

```yarn run test```



Application Structure -

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
