
const express = require("express");
const app = express();
const cors = require('cors');

var videoRouter = require('./routes/youtube-download');

const corsOptions = {
    origin: 'https://youtube-mania.vercel.app',
  };
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON payloads
app.get("/", (req, res) => res.send("Express on Vercel 1"));
app.use('/video', videoRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;