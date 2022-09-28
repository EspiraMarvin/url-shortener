const { Router } = require('express')
const Url = require('../models/Url')
const router = Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const { baseUrl } = require('../config/config')

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
      // if (url) res.json(url)
      if (url) res.status(401).json('URL Already Shortened')
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
    res.status(401).json('Failed to Shorten, looks like an Invalid URL')
    // res.status(401).json('Can Not Shorten An Invalid URL')
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


// delete all
router.delete('/all:ids', async (req, res) => {
  console.log('REQ URLS AT URI DELTE API', req)

  const urls = req.params.ids
  console.log('URLS AT URI DELTE API', urls)
  try {
    urls.forEach(async (url) => {
  console.log('URL AT URI DELTE API', url);

    const removed = await Url.findByIdAndDelete(url._id)
    if (!removed) throw Error('Something went wrong. Client could not be found')
    });
    // const removed = await Url.deleteMany({ _id: urls.indexOf()})
    // if (!removed) throw Error('Something went wrong. Client could not be found')
    res.status(200).json(removed)
  } catch (error) {
    console.log('delete many error', error)
    res.status(404).json({ errorMessage: error.message })
  }
})

// delete one
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Url.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong. Client could not be found')
    res.status(200).json(removed)
  } catch (error) {
    res.status(404).json({ errorMessage: error.message })
  }
})



module.exports = router
