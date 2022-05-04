module.exports = {
	entry: ['./client/index.js'],
	output: {
		path: __dirname,
		filename: './public/bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react'],
				},
			},
			{
				test: [/\.s[ac]ss$/i, /\.css$/i],
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
}
