const express = require('express')
const { PORT } = require('./config')
const connectDB = require('./config/db')
const app = express()

// connect to db
connectDB()

app.use(express.json({ extended: false })) // allows us to accept json into our api

// routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))


app.listen(PORT, () => console.log(`Server running on ${PORT}`))
