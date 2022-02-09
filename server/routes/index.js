const { Router } = require('express')
const Url = require('../models/Url')
const router = Router()


// @router GET /:code
// @desc   REdirect to original/long url/

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code })
    console.log('urlCOde', req.params.code)

    if (url) {
      return res.redirect(url.longUrl)
    }else {
      return  res.status(404).json('No Url Found')

    }
  }
  catch (err) {
    console.log('error', err)
    res.status(500).json('Server error')
  }

})

module.exports = router
