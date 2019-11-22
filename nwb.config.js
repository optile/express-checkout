module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'optileExpressCheckout',
      externals: {
        react: 'React'
      }
    }
  }
}
