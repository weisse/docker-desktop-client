// dependencies
const path = require("path");
const webpack = require("webpack");
const WebpackChunkHash = require("webpack-chunk-hash");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// constants
const env = process.env.ENV || "devel";
const watch = process.env.WATCH === "true" ? true : false;
const buildPath = path.join(__dirname, "build");

// configurations
const config = {
    target: "electron-renderer",
    entry: {
        vendor: "./src/vendor.js",
        main: "./src/main.jsx"
    },
    resolve: {
        modules: ["node_modules"]
    },
    output: (() => {
        if(env === "devel"){
            return {
                path: buildPath,
                publicPath: "/",
                filename: "[name].bundle.js",
                chunkFilename: "[name].bundle.js",
                sourceMapFilename: "[name].bundle.map"
            }
        }
        if(env === "production"){
            return {
                path: buildPath,
                publicPath: "/",
                filename: "[name].[chunkhash].bundle.js",
                chunkFilename: "[name].[chunkhash].bundle.js",
                sourceMapFilename: "[name].[chunkhash].bundle.map"
            }
        }
    })(),
    module: {
        rules: [
            {test: /\.jsx?$/, use: "babel-loader"},
            {test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: /flexboxgrid/
            },
            {test: /\.json$/, use: "json-loader"},
            {
                test: /node_modules\/JSONStream\/index\.js$/,
                loaders: ['shebang-loader', 'babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest"], // vendor libs + extracted manifest
            minChunks: Infinity,
        }),
        (() => {
            if(env === "production"){
                return new webpack.HashedModuleIdsPlugin();
            }
            return new webpack.NamedModulesPlugin();
        })(),
        new WebpackChunkHash(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs'
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        (() => {
            if(env === "devel"){
                return new webpack.HotModuleReplacementPlugin();
            }
            if(env === "production"){
                return new webpack.optimize.UglifyJsPlugin({
                    compress: { warnings: false }
                });
            }
            return function(){};
        })()
    ],
    devtool: (() => {
        if(env === "devel"){
            return "source-map";
        }
        if(env === "production"){
            return "source-map";
        }
    })(),
    devServer: {
        contentBase: buildPath,
        historyApiFallback: {
            index: "/"
        },
        compress: false,
        hot: true,
        inline: true,
        port: 9000
    },
    watch: (() => {
        if(env === "devel"){
            return watch;
        }
        return false;
    })(),
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    }
};

module.exports = config;