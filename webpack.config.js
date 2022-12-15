import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import EslingPlugin from 'eslint-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
export const context = _resolve(__dirname, 'src');
export const entry = {
  main: './index',
};
export const resolve = {
  extensions: ['.ts', '.js'],
};
export const output = {
  path: _resolve(__dirname, 'dist'),
  clean: true,
  filename: '[name].[contenthash].js',
  assetModuleFilename: 'assets/[name][ext]',
};
export const optimization = {
  minimize: isProd,
  minimizer: [new CssMinimizerPlugin()],
};
export const devServer = {
  port: 4200,
  hot: false,
};
export const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
  }),
  new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  new EslingPlugin({ extensions: 'ts' }),
];
export const module = {
  rules: [
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [_loader, 'css-loader', 'postcss-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[name][ext]',
      },
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext]',
      },
    },
    {
      test: /\.mp3$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/audio/[name][ext]',
      },
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.ts$/i,
      use: 'ts-loader',
    },
  ],
};
