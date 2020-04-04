const NodeGeocoder = require('node-geocoder')
const dotenv = require('dotenv')

dotenv.config()

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    formatter: null
}

const geocoder = NodeGeocoder(options)

