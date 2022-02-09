const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('mongo db connected')
  }
  catch (err) {
    console.log('err', err.message)
    process.exit(1)
  }
}

module.exports = connectDB;
