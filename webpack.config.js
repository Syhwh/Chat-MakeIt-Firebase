const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
module.exports = {    
    entry: {
        'bundle.js': [
          path.resolve(__dirname, 'src/views.js'),
          path.resolve(__dirname, 'src/app.js')
        ]
    },
    // entry:
    //  path.join(__dirname, "src/app.js"),    
    output: {
        path: __dirname + "/build",
        filename: 'bundle.js'
    },
    devServer: {
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',


                ]
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: path.join(__dirname, '.src/templates/partials')
                }
            },

            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //      use: [
            //          'file-loader',

            //         ],
            // },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: [
            //       'file-loader',
            //       {
            //         loader: 'image-webpack-loader',
            //         options: {
            //           bypassOnDebug: true, // webpack@1.x
            //           disable: true, // webpack@2.x and newer
            //         },
            //       },
            //     ],
            //   }
        ]
},

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new MomentLocalesPlugin({
        //     localesToKeep: ['es-us', 'ru'],
        // }),
    ]
}