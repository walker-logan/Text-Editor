const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title:'Just Another Text Editor',
        template: './src/index.html',
      }),
      new WebpackPwaManifest({
        name:'Just Another Text Editor',
        short_name: 'Text Editor',
        description: 'A sophisticated text editor for both online and offline use.',
        background_color: '#FE65BF',
        theme_color: '#07B8BB',
        start_url: '/',
        publicPath: '/',
        icons:[{
          src: path.resolve('src/images/logo.png'),
          sizes: [96,120,200,250,400,500],
          destination: path.join('assets','icons'),
        }],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js/,
          exclude: /(node_modules|browser_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
