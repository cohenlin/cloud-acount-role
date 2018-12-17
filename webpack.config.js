const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = (webpackConfig, env) => {
  const production = env === 'production';
  console.log('production:', production);
  // FilenameHash
  // webpackConfig.output.chunkFilename = '[name].[chunkhash].js';
  // 如果是打包那么用下面的配置
  if (production) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new ManifestPlugin(),
      new UglifyJSPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
    ]);
  }
  return webpackConfig;
};
