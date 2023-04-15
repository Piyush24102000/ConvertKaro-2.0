const nodeExternals = require('webpack-node-externals');
module.exports = {
    // ...
    resolve: {
      fallback: {
        "node": require.resolve("node-libs-browser")
      }
    }
  };
  