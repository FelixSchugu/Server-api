const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(cors());

app.get("/api/", async (req, res) => {
  try {
    const requested = await axios.get(
      "http://api.mediastack.com/v1/news?access_key=c9627c75914ff4f86d18613fbef4b160&languages=en&limit=10"
    );

    console.log("La petición se ejecutó correctamente");

    res.json(requested.data);
  } catch (e) {
    console.error(e);
    res.json({ error: "something went wrong" });
  }
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("Server listening on port: 3000");
});
