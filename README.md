# Webpack - Angular 1 Template
Basic template for my quick-start project.  Has basic angular 1 project backed with a nodejs server.

[Build & Development Documentation](BUILD.md)

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