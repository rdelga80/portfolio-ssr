const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true }))

const nuxtConfig = require('./nuxt.config.js')

const config = {
  ...nuxtConfig,
  dev: false,
  debug: true,
  buildDir: '.nuxt',
  publicPath: 'public'
}

const nuxt = new Nuxt(config)

let isReady = false

const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest (req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-control', 'public, max-age=1, s-maxage=1')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.ssrapp = functions.https.onRequest(app)
