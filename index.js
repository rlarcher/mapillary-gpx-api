const express = require("express");
const bodyParser = require("body-parser");
const gpx = require('./gpx');


const server = express();
const port = process.env.PORT || 8323;

server.use(bodyParser.json());

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

server.get('/first-images', async (req, res) => {
    const images = await gpx.getImages();
    res.json({
        'images': images,
    });
});

server.get('/image-keys', async (req, res) => {
    const images = await gpx.getImages();
    const keys = images.map((image) => {
        if(image && image.properties && image.properties.key) {
            return image.properties.key;
        }
    }).filter((key) => !!key);
    console.log('len of keys is ', keys.length)
    res.json({
        keys,
    });
});

server.get('/', (req, res) => {
    res.send('Empty route does nothing!!!');
});

server.listen(port);
