const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const sanitizeHtml = require('sanitize-html')

const app = express()

require('dotenv').config()

// SOLVE THIS PROBLEM
// const whitelist = ['https://rdelgado-portfolio.web.app/', 'https://ricdelgado.com/']

// const prodOrigin = (origin, callback) => {
//   if(whitelist.includes(origin)) {
//     callback(null, true)
//   } else {
//     callback(new Error('Not allowed by CORS'))
//   }
// }

// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' ? prodOrigin : 'http://localhost:3000'
// }

// app.use(cors(corsOptions))

app.use(cors({ origin: true }))
app.use(bodyParser.json())

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

app.post('/sendEmail', async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.dreamhost.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_LOGIN_USER,
      pass: process.env.SMTP_LOGIN_PWORD
    }
  })

  let { name, email, phone, subject, message } = req.body
  name = sanitizeHtml(name)
  email = sanitizeHtml(email)
  phone = sanitizeHtml(phone)
  subject = sanitizeHtml(subject)
  message = sanitizeHtml(message)

  try {
    let info = await transporter.sendMail({
      from: `ric@ricdelgado.com`,
      to: 'ric@ricdelgado.com',
      subject: subject,
      text: `${name} <${email}> - ${phone}\n\n${message}`
    })
  
    console.log(`Message sent ${info.messageId}`)
  
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

app.get('*', handleRequest)
app.use(handleRequest)
exports.ssrapp = functions.https.onRequest(app)
