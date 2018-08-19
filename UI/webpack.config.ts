import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

import * as winston from 'winston'

interface IEnv {
  readonly prod: boolean
}

export default function resolveConfig (env: (IEnv | undefined), _args: any): webpack.Configuration {

  const isProd = !!(env && env.prod)

  const APP_CONFIG_LOCATION = isProd ? './_environments/app-config.prod.json' : './_environments/app-config.dev.json'

  return {
    mode: isProd ? 'production' : 'development',

    entry: ['react-hot-loader/patch', './src/index.tsx'],

    output: {
      filename: isProd ? '[name].[hash].js' : '[name].js',
      globalObject: 'this',
      path: path.join(__dirname, './dist')
    },

    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

    resolve: {
      alias: {
        'app': path.resolve(__dirname, 'src/app'),       
        'services': path.resolve(__dirname, 'src/services')       
      },
      extensions: ['.ts', '.tsx', '.js', '.json']
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: 'ts-loader' }
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          use: [
            { loader: 'source-map-loader' }
          ]
        },       
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 8192 }
            }
          ]
        }
      ]
    },

    devServer: {
      compress: true,
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      hot: true,
      port: 8080
    },
    plugins: [
      new CleanWebpackPlugin(['dist/']),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin(
        [
          { from: './src/_assets/pint.png' },
          { from: './src/_assets/saloon-doors.png' },
          { from: './src/_assets/plus-512.png' },
          { from: APP_CONFIG_LOCATION, to: 'app-config.json' }
        ]
      ),
      new MiniCssExtractPlugin()
    ]
  }
}
