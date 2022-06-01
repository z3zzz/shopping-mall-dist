const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryObject = {
  account: './src/views/account/account.js',
  'account-orders': './src/views/account-orders/account-orders.js',
  'account-security': './src/views/account-security/account-security.js',
  'account-signout': './src/views/account-signout/account-signout.js',
  admin: './src/views/admin/admin.js',
  'admin-orders': './src/views/admin-orders/admin-orders.js',
  'admin-users': './src/views/admin-users/admin-users.js',
  cart: './src/views/cart/cart.js',
  'category-add': './src/views/category-add/category-add.js',
  home: './src/views/home/home.js',
  login: './src/views/login/login.js',
  order: './src/views/order/order.js',
  'order-complete': './src/views/order-complete/order-complete.js',
  'product-add': './src/views/product-add/product-add.js',
  'product-detail': './src/views/product-detail/product-detail.js',
  'product-list': './src/views/product-list/product-list.js',
  register: './src/views/register/register.js',
  'page-not-found': './src/views/page-not-found/page-not-found.js',
  'privacy-policy': './src/views/privacy-policy/privacy-policy.js',
};

const htmls = [];
for (const key of Object.keys(entryObject)) {
  htmls.push(
    new HtmlWebpackPlugin({
      template: entryObject[key].replace('js', 'html'),
      inject: false,
      minify: true,
      chunks: [key],
      filename: entryObject[key].replace('js', 'html'),
    })
  );
}

module.exports = {
  entry: entryObject,
  mode: 'production',
  output: {
    path: `${__dirname}/dist`,
    filename: 'src/views/[name]/[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'src/views/[name]/[name].css',
    }),
    ...htmls,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|gif|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'src/views/[name].[ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
};
