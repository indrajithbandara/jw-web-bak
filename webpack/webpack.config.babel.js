import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import url from 'url';
import paths from './paths';

// 优化Css文件，做兼容性适配
// postcss = () => {
//   return [autoprefixer({browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9',]})];
// }

let WebpackDevConfig = () => {
    const isProduction = process.env.NODE_ENV == 'production'
        ? true
        : false;
    const homepagePath = require(paths.appPackageJson).homepage;
    let publicPath = homepagePath
        ? url.parse(homepagePath).pathname
        : '/';
    if (!publicPath.endsWith('/')) {
        // If we don't do this, file assets will get incorrect paths.
        publicPath += '/';
    }
    const bail = true;
    // 生成源码图
    // const devtool = 'source-map';
    // 入口配置
    const entry = paths.appIndexJs;
    // 出口配置
    const output = {
        // 编译后的目录
        path: paths.appBuild,
        filename: isProduction
            ? 'Scripts/[name].[chunkhash:8].js'
            : 'Scripts/[name].js',
        chunkFilename: isProduction
            ? 'Scripts/[name].[chunkhash:8].chunk.js'
            : 'Scripts/[name].js',
        publicPath: publicPath
    }
    const resolve = {
        fallback: paths.nodePaths,
        extensions: [
            '.js', '.json', '.jsx', ''
        ],
        alias: {
            'react-native': 'react-native-web'
        }
    }
    const module = {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: paths.appSrc
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                        'stage-3'
                    ],
                    plugins: ["babel-plugin-transform-decorators-legacy"]
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(gif|jpeg|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: isProduction
                        ? 'media/[name].[hash:8].[ext]'
                        : 'media/[name].[ext]'
                }
            }, {
                test: /\.(ico)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'media/[name].[ext]'
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.html$/,
                loader: 'html',
                query: {
                    attrs: ['link:href']
                }
            }
            // }, {
            //   test: /\.css$/,
            //   // loader: 'style!css'
            //   loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            //   // loader:ExtractTextPlugin.extract('style-loader',[autoprefixer({browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']})])
            // },
        ]
    }
    const eslint = {
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    }
    let plugins = [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            filename: paths.appRoot + '/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../manifest.json'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['react'], //提取公共模块
        //     minChunks: Infinity //提取所有entry公同依赖的模块
        // }),
        //清空发布目录
        new CleanWebpackPlugin(['build/css','build/media','build/scripts'], {
            root: paths.appRoot, // An absolute path for the root  of webpack.config.js
            verbose: true, // Write logs to console.
            dry: false // Do not delete anything, good for testing.
        }),
        new ExtractTextPlugin(isProduction
            ? 'css/[name].[contenthash:8].css'
            : 'css/[name].css', {allChunks: true})
    ]
    const node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
    return {
        bail,
        entry,
        output,
        resolve,
        module,
        eslint,
        plugins
    }
}

export default WebpackDevConfig;
