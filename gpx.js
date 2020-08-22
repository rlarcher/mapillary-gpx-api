const api = require('./api');
const xml = require('xml-js');
const fs = require('fs');

const GPX_PATH = './That_one_really_dark_tunnel_on_the_bridle_part_4.gpx';

const getCoordinates = async () => {
    return await coordinatesFromFilePath(GPX_PATH);
}

const getImages = async () => {
    const coordinates = await getCoordinates();
    return await Promise.all(coordinates.splice(0, 10000).map((coordinates) => {
        return api.getFirstImage(coordinates[0], coordinates[1]);
    }));
};


const coordinatesFromFilePath = async (filePath) => {
    return new Promise((resolve) => {
        fs.readFile(filePath, (err, d) => {
            const data = JSON.parse(xml.xml2json(d, { compact: true }));
            const points = data['gpx']['trk']['trkseg']['trkpt'];
            const coords = points.map((point) => [point._attributes.lat, point._attributes.lon]);
            return resolve(coords);
        });
    });
};

module.exports = {
    coordinatesFromFilePath,
    getCoordinates,
    getImages,
}
