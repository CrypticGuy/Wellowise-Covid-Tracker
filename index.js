const express   = require('express')
const cors      = require('cors')
const app       = express()
const port      = 3000
const fs        = require('fs')
const {getDistrictWiseData} = require('./pool')

app.use(cors())

require('dotenv').config()

app.get('/delhiMap', function(req, res) {
    fs.readFile('./delhiMap.json', (err, data) => {
        if (err) throw err
        res.send(JSON.parse(data))
    })
})

app.get('/delhiDummyPoint', function(req, res) {
    fs.readFile('./delhiDummyPoint.json', (err, data) => {
        if (err) throw err
        res.send(JSON.parse(data))
    })  
})

app.get('/delhiDistrictData', function(req, res) {
    getDistrictWiseData().then((resp) => res.json(resp))
})

app.listen(port, () => console.log(`Wellowise-Covid-Tracker listening at http://localhost:${port}`))