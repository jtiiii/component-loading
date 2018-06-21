module.exports = {
    devtool: "source-map",
    entry: "./src/scripts/main.js",
    output: {
        path: __dirname + "/dist/scripts",
        publicPath: "/dist",
        filename: "loading-bundle.js"
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