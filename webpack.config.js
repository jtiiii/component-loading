module.exports = {
    devtool: "source-map",
    entry: "./src/scripts/main.js",
    output: {
        path: __dirname + "/build",
        publicPath: "/build",
        filename: "loading.js"
    },
    module: {
        rules:[
            {
                test: /\.png$/,
                use: ['url-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader','css-loader']
            }
        ]
    }
};