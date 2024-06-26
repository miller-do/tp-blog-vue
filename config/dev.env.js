'use strict'
//.env.development
//VUE_APP_PORT='8080'
//VUE_APP_BASE_URL="/api"
//VUE_APP_BASE_TITLE="mytitle"
//VUE_APP_BASE_PATH="/api"

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
console.log('params',process.argv);
let baseUrl = ''
switch (params) {
    case '--env=test':
      baseUrl = '"http://a.com"'
      break
    case '--env=prod':
      baseUrl = '"http://81.71.15.166"'
      break
    default:
      baseUrl = '"/api"'
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl
})
