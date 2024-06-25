var express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());

/* GET users listing. */
router.post('/download', async (req, res) => {
  const url = req.body.url;
  const format = req.body.format;
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: format }).pipe(res);
});

module.exports = router;
