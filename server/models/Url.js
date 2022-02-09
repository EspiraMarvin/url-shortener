const { Schema, model }  =require('mongoose')

const UrlSchema = new Schema(
  {
    urlCode: {
      type: String
    },
    longUrl: {
      type: String
    },
    shortUrl: {
      type: String
    },
    date: {
      type: String,
      default: Date.now()
    }
  }
)

// const Url = model('Url', UrlSchema)
// module.exports = Url
module.exports = model('Url', UrlSchema)
