const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports={
    entry: path.join(__dirname, "src/app.js"),
    output: { path:__dirname+ "/build",
               filename: 'bundle.js' },
    
    devServer:{
        port:5000
    },
    module:{
        rules:[
            {
                test: /\.s[ac]ss$/i,
                use:[
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                     'sass-loader',
                ]
            },
            {
                test: /\.hbs$/, 
                loader: "handlebars-loader" ,
                options:{
                    partialDirs: path.join(__dirname ,'.src/templates/partials')
                }
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}