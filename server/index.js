const express = require('express')
const { PORT } = require('./config')
const cors  =require('cors')
const connectDB = require('./config/db')
const app = express()
app.use(cors())
// connect to db
connectDB()


app.use(express.json({ extended: false })) // allows us to accept json into our api

// routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))


app.listen(PORT, () => console.log(`Server running on ${PORT}`))
