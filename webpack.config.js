const path = require('path');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'ts-loader',
                test: /\.ts$/,
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
}
