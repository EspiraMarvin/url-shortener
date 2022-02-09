const { Router } = require('express')
const Url = require('../models/Url')
const router = Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const { baseUrl } = require('../config')

// @ route POST /api/url/shorten
// @desc   Create short url

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body

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
      console.log('error', e)
      res.status(500).json('Server Error')
    }
  }else {
    // long url is not valid
    res.status(401).json('Invalid URL')

  }

})


module.exports = router
