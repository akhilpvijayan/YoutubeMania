
const express = require("express");
const app = express();
const cors = require('cors');

var videoRouter = require('./routes/youtube-download');

const allowedOrigins = [
  "https://youtube-mania.vercel.app",
  "https://another-allowed-origin.com",
  "https://yet-another-allowed-origin.com"
];
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON payloads
app.get("/", (req, res) => res.send("Express on Vercel 1"));
app.use('/video', videoRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;