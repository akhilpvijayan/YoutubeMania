var express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const bodyParser = require('body-parser');
const archiver = require('archiver');

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());

/* GET users listing. */
router.post('/download', async (req, res) => {
  const url = req.body.url;
  const format = req.body.format;

  try {
    const info = await ytdl.getInfo(url);
    const videoDetails = info.formats.find(f => f.container === format && f.hasAudio && f.hasVideo);

    if (Number(info.formats.contentLength) > MAX_SIZE) {
      return res.status(413).json({ error: "Video exceeds maximum size of 4 MB" });
    }

    const videoStream = ytdl(url, { format: format });

    let videoBuffer = Buffer.alloc(0);

    videoStream.on('data', chunk => {
      videoBuffer = Buffer.concat([videoBuffer, chunk]);
      if (videoBuffer.length > MAX_SIZE) {
        videoStream.destroy();
        return res.status(413).json({ error: "Video exceeds maximum size of 4 MB" });
      }
    });

    videoStream.on('end', () => {
      const base64String = videoBuffer.toString('base64');
      res.json({ video: base64String });
    });

    videoStream.on('error', (err) => {
      res.status(500).json({ error: "Failed to process download" });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process download" });
  }
});

module.exports = router;
