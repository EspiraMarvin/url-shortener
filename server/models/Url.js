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
  },
  {
    timestamps: true
  }
)

module.exports = model('Url', UrlSchema)
