//import { get } from "axios";
const axios = require('axios')
// TODO: ENV VAR
const CLIENT_ID = "YVRORzdsbGxFS2lXcHhpNzdZSFFhNTplYjM1NzFlN2NhNGJlMzlk";
const BASE_URL = "https://a.mapillary.com/v3";

const getDataFromLatLong = async (lat, long) => {
    const url = BASE_URL + "/images?client_id=" + CLIENT_ID + `&closeto=${long},${lat}&radius=8`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.log("boo", e);
    }
};

const getFirstImage = async (lat, long) => {
    const data = await getDataFromLatLong(lat, long);
    const features = data.features;
    return features[0];
};

module.exports = {
    getDataFromLatLong,
    getFirstImage,
}