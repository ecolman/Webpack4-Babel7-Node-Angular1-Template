/*eslint no-undef:0*/
/*eslint no-process-env:0*/

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const DisableOutputWebpackPlugin = require('disable-output-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = (env, args) => {
  const isProd = args && 'mode' in args && args.mode === 'production';
  const nodeEnv = process.env.NODE_ENV || (env && env !== true ? env : 'local');

  console.log(`WEBPACK :: SERVER | env = ${nodeEnv} | mode = ${isProd ? 'production' : 'development'}`);

  let plugins = [];

  if (isProd) {
    const basePackageValues = {
      name: 'webpack-template',
      main: 'server/index.js',
      version: '1.0.0',
      engines: {
        node: '^6.2.2',
        npm: '^3.9.5'
      }
    };

    plugins = [
      new DisableOutputWebpackPlugin(), // don't want webpack output, server is build with babel, but want to run through webpack build process
      new GeneratePackageJsonPlugin(basePackageValues, path.resolve(__dirname, 'package.json')),
      new CleanWebpackPlugin(['dist/server', 'dist/*.json', 'dist/*.zip', 'dist/*.js']),
    ];
  } else {
    plugins = [
      new WebpackShellPlugin({
        onBuildEnd: [
          'npm run start:server:nodemon'
        ]
      })
    ];
  }

  return {
    name: 'server',
    target: 'node',
    mode: 'development',
    watch: !isProd,
    entry: {
      server: './server/index.js'
    },
    output: {
      filename: `[name].${isProd ? '[chunkhash:8]' : 'bundle'}.js`,
      path: isProd ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, '.tmp'),
      libraryTarget: 'commonjs2'
    },

    devtool: 'source-map',
    stats: 'minimal',

    externals: [
      NodeExternals()
    ],

    optimization: {
      nodeEnv: false,
      noEmitOnErrors: true
    },

    node: {
      __dirname: true,
    },

    plugins,

    module:
    {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                quiet: true
              }
            },
            'import-glob'
          ],
          exclude: /(node_modules)/,
          include: [
            path.resolve(__dirname, 'server/')
          ]
        }
      ]
    }
  };
};
