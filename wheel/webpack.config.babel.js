import { resolve } from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { getIfUtils } from 'webpack-config-utils';

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  const outputDir = env.dev === 'local' ? 'public' : '../site/themes/fortifi/js/';

  return {
    context: resolve('src/assets'),
    entry: './js/index.js',
    output: {
      path: resolve(outputDir),
      filename: './bundle.js',
      publicPath: '/public/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin()
    ]
  };
};
