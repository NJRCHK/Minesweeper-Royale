import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config = {
    entry: path.join(__dirname, "app/client/", "index.tsx"),
    mode: 'development',
    output: {
        path:path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] 
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { 
                test: /\.tsx?$/, 
                exclude: /node_modules/,
                use: ['ts-loader']
            },
        ]
    },     
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "app/client/", "index.html"),
        }),
    ],
}

export default config;