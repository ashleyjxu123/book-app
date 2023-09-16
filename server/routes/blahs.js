// routes/blahs.js

const express = require('express');
const router = express.Router();

// Load Book model
const { Blah } = require('../models/Blah');

router.get('/test', (req, res) => res.send('blahs route testing!'));

router.get('/get', async (req, res) => {
  try{
    const blahs = await Blah.find({})
    res.json(blahs);
  } catch(err) {
    res.status(404).json(err);
  }
});

router.post('/add', async (req, res) => {
  const blah = new Blah({
    name: "fffd",
    num: 3,
  });

  await blah.save();
  res.status(200).send(blah);
});

module.exports = router;
