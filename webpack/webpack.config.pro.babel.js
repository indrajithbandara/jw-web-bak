import webpack from 'webpack';
import WebpackDevConfig from './webpack.config.babel.js';
process.env.NODE_ENV = 'production';
const _config= WebpackDevConfig();
_config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
    },
    mangle: {
        screw_ie8: true
    },
    output: {
        comments: false,
        screw_ie8: true
    }
}))
export default _config;
