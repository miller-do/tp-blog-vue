'use strict'
//.env.development
//VUE_APP_PORT='8080'
//VUE_APP_BASE_URL="/api"
//VUE_APP_BASE_TITLE="mytitle"
//VUE_APP_BASE_PATH="/api"

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[2]
let baseUrl = ''
switch (params) {
    case 'test':
      baseUrl = '"http://81.71.15.166:66/"'
      break
    case 'prod':
      baseUrl = '"http://81.71.15.166:66"'
      break
    default:
      baseUrl = '"/apis"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  baseUrl: baseUrl
})