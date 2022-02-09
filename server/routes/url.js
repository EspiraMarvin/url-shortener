const { Router } = require('express')
const Url = require('../models/Url')
const router = Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const { baseUrl } = require('../config')

// @ route POST /api/url/shorten
// @desc   Create short url

router.post('/shorten', async (req, res) => {
  const longUrl = req.body.url

  // check base url
  if (!validUrl.is_uri(baseUrl)) {
    return res.status(401).json('Invalid Base Url')
  }

  // create url code
  const urlCode = shortId.generate()

  // check long url
  if (validUrl.is_uri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl })
      if (url) res.json(url)
      else {
        const shortUrl = baseUrl + '/' + urlCode
        url = new Url( {
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          })
        await url.save()
        res.json(url)
      }
    }
    catch (e) {
      res.status(500).json('Server Error')
    }
  }else {
    // long url is not valid
    res.status(401).json('Can Not Shorten Invalid URL')

  }
})

// @ route GET /api/urls
// @desc   list of all urls (long and short urls)

router.get('/', async (req, res) => {
  try {
    const urls = await Url.find()
    if (!urls) throw new Error('No Urls')
    const sorted = urls.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (error) {
    res.status(404).json({success: true, message: error.message})
  }
})



module.exports = router
