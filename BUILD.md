# webpack-template

## Build System

### Components

#### [Webpack 4](https://webpack.js.org/)
Webpack analyzes, converts, and bundles javascript code.  The plugin ecosystem is very rich and webpack has a large community.  For this application, webpack is used both for the front-end (FE) and back-end (BE) code.  The code goes through multiple loaders (plugins), which can analyze or change the code.  Webpack can also analyze, convert, and bundle other types of files besides javascript files. The application sass/css, html, web fonts and other types of files are also bundled into the code.

Webpack is driven by configuration and plugins, so it is highly customizable.  Review the [webpack documentation](https://webpack.js.org/concepts/) or the webpack config files [webpack.client.config.js](webpack.client.config.js) and [webpack.server.config.js](webpack.server.config.js) to get a closer look.

#### [Babel 7](https://babeljs.io/)
Babel is a transpiler, which takes javascript code in one format and converts it to another.  This is useful when writing ES6 code that needs to be run in an environment that does not support it.  Babel allows developers to choose the format to write, without having to worry about compatability.

#### [npm](https://docs.npmjs.com/cli/npm)
Node Package Manager is a dependency resolver, package installer, and task runner.  The packages which this application depend on are located in the [package.json](package.json) file.  This file also holds the scripts that are used to run tasks for the application.

### Developing
To run the application in development (development/production) mode and local (local/development/test/ci/qa/uat/production) environment, run the `npm run start:dev` command.  The FE runs `webpack-dev-server` with `port 3000` and proxies any `/api` requests to the server on port 9000.  The BE runs webpack to compile the code and then nodemon to run/watch the server file output by webpack.  The BE runs on `port 9000`.

#### Environment
The app will start using the `LOCAL` environment (`local.js` config files) if tasks are run without first setting the `NODE_ENV` variable.  To start the application in another environment, set the `NODE_ENV` before running a npm script.

For example, to start the app using the `QA` environment (`qa.js` config files), run this command:
- linux/osx: `NODE_ENV=qa npm run start:dev`
- windows: `SET NODE_ENV=qa` and then `npm run start:dev`

#### Separate / Together
The FE and BE code can also be run independently of each other.  The npm script for the `start:dev` task actually starts the `start:client` and `start:server` at the same time.

If running only the FE, the proxy settings can be changed in the [webpack.client.config.js](webpack.client.config.js) config, `devServer` setting, to point to somewhere besides `http://localhost:9000` (like qa or uat).

If run together, changes in the `client` directory will only restart the client, changes in the `server` directory will only restart the server.

To start only the client or server, run these commands:
- client: `npm run start:client`
- server: `npm run start:server`

#### Database Migration Scripts
The application will only run the database migration scripts in production mode.  Developers should be aware if new scripts are added to the migrations directory and should run the `npm run migrations` script on an as needed basis to sync the database.

### Building
To build the application, run the `npm run build:app` task.  This will run both the FE and BE through webpack,  write the files to the `dist` directory, and zip the directory.

To run the application, go into `dist` directory, install packages with `npm install` and then `node server`.  Be sure to set the correct `NODE_ENV` variable before running `node server`.

#### Environment
When building for production, it's important to always set the correct `NODE_ENV` variable for where the code will be running.  Since the FE code is compiled by webpack, it always use the environment set when being built, not set in the command line.  The BE code can be started in any environment after being built by starting it with the `NODE_ENV` variable set.

### Npm Scripts
Npm scripts are used to start tasks for the app.  To run a npm script, type:

`npm run <script name>`

#### Scripts
- start:dev - starts the development environment, runs both client and server "start" tasks
- start:dev:client - runs webpack-dev-server and compiles the FE, `port 3000`
- start:dev:sever - runs webpack to analyze and compile the BE code, then runs nodemon
- start:dev:server:nodemon - starts nodemon to run/watch the BE code, `port 9000`
- build:app - builds the application, runs both client and server "build" tasks, then zips the files
- build:client - starts webpack to analyze, compile, and bundle the FE code to `dist/client`
- build:server - starts webpack to analyze the BE code and then starts babel to write the transpiled code to `dist/server`
- build:server:webpack - runs the BE code through webpack loaders and checks code
- build:server:babel - runs the BE code through the babel transpiler and writes code to `dist/server`
- migrations - runs the migration scripts in the `server/sqldb/migrations` directory 
