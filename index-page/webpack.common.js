const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: {
    // 'vendor': ['react', 'react-dom'],
    // 'logger': './src/js/lib/logger.js',
    'bridgepage': './src/index.js',
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
  },
  optimization: {
    // runtimeChunk: {
    //   name: "runtime"
    // },
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // 'components': path.resolve(__dirname, '.', 'src', 'js/components'),
      // 'containers': path.resolve(__dirname, '..', 'src', 'containers'),
      // 'assets': path.resolve(__dirname, '..', 'src', 'assets'),
    },
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
  ],
};
