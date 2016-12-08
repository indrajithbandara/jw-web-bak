import webpack from 'webpack';
import paths from './paths';

process.env.NODE_ENV = 'production';

const liblist = [
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'react-router-redux',
    'redux',
    'iscroll',
    'react-iscroll',
    'immutable',
    'redux-immutable',
    'redux-thunk',
    'redux-promise'
]

let dllconfig = () => {
    const output = {
        path: paths.appBuild,
        filename: '[name].js',
        library: '[name]'
    }
    const entry = {
        'lib': liblist
    }
    const plugins = [
      new webpack.DllPlugin({path: 'manifest.json', name: '[name]', context: __dirname}),
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
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
      })
    ]
    return {entry, output,plugins}
}

export default dllconfig();
