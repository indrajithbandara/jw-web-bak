import webpack from 'webpack';
import WebpackDevConfig from './webpack.config.babel.js';
process.env.NODE_ENV = 'development';

const _config = WebpackDevConfig();

export default _config;
