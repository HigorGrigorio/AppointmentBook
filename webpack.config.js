const path = require('path'); // CommonJS

module.exports = {
    mode: 'production',
    entry: './frontend/app.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                }
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                exclude: /node_modules/,
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // For newer versions of Webpack it should be
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }

        ]
    },
    devtool: 'source-map'
};