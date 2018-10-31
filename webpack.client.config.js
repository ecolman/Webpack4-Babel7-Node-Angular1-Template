/*eslint no-undef:0*/
/*eslint no-process-env:0*/

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = (env, args) => {
  const isProd = args && 'mode' in args && args.mode === 'production';
  const nodeEnv = process.env.NODE_ENV || (env && env !== true ? env : 'local');

  console.log(`WEBPACK :: CLIENT | env = ${nodeEnv} | mode = ${isProd ? 'production' : 'development'}`);

  let plugins = [];
  let jsLoaders = [];

  if (isProd) {
    plugins = [
      new CleanWebpackPlugin(['dist/client'])
    ];
  } else {
    plugins = [
      new webpack.HotModuleReplacementPlugin()
    ];
  }

  return smp.wrap({
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: {
      client: [
        '@babel/polyfill',
        './client/app/app.js',
        './client/app/app.scss'
      ],
      vendor: [
        'angular',
        'angular-animate',
        'angular-cookies',
        'angular-resource',

        'angular-socket-io',
        'angular-ui-bootstrap',
        '@uirouter/angularjs',

        'lodash'
      ]
    },
    output: {
      chunkFilename: `[name].${isProd ? '[chunkhash:8]' : 'bundle'}.js`,
      filename: `[name].${isProd ? '[chunkhash:8]' : 'bundle'}.js`,
      path: isProd ? path.resolve(__dirname, 'dist/client') : path.resolve(__dirname, '.tmp')
    },

    devtool: 'inline-source-map',
    devServer: {
      clientLogLevel: 'error',
      compress: true,
      contentBase: path.resolve(__dirname, 'client/'),
      historyApiFallback: true,
      hot: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:9000/',
        '/socket.io-client': 'http://localhost:9000/',
      },
      stats: 'minimal',
      watchContentBase: true
    },

    stats: 'minimal',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            cache: true,
            parallel: true
          }
        })
      ],
      noEmitOnErrors: true,
      nodeEnv, // sets the node process.env.NODE_ENV in webpacked code
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            minChunks: 2
          }
        }
      }
    },

    plugins: [
      ...plugins,
      new HtmlWebpackPlugin({
        template: 'client/_index.html',
        filename: 'index.html',
        inject: 'head'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],

    module:
    {
      rules: [
        {
          test: /\.js$/,
          use: [
            ...jsLoaders,
            {
              loader: 'ng-annotate-loader',
              options: {
                ngAnnotate: 'ng-annotate-patched'
              }
            },
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                quiet: true
              }
            }
          ],
          include: [
            path.resolve(__dirname, 'client/')
          ]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          include: [
            path.resolve(__dirname, 'client/')
          ]
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'resolve-url-loader'
          ],
          include: [
            path.resolve(__dirname, 'client/')
          ]
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                outputStyle: 'compressed',
                precision: 10,
                sourceComments: false
              }
            },
            'import-glob'
          ],
          include: [
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/*.scss'),
            path.resolve(__dirname, 'client/app/app.scss')
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)$/,
          loader: 'file-loader',
          include: [
            path.resolve(__dirname, 'client/')
          ]
        }
      ]
    }
  });
};
