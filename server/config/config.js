// eslint-disable-next-line no-unused-vars
const env = require('dotenv/config')

module.exports = {
  mongoUri: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'https://shorts.onrender.com'
}
