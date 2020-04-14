
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const customerTheme = require('./van-custom-theme')

module.exports = {
  // outputDir: "docs",
  // publicPath: process.env.NODE_ENV === "production" ? "/vant-demo/" : "/",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  less: {
    modifyVars: customerTheme.theme
  }
}
