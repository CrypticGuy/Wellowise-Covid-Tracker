const express               = require('express')
const cors                  = require('cors')
const app                   = express()
const port                  = 3000
const fs                    = require('fs')
const {getDistrictWiseData} = require('./pool')

app.use(cors())
//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});
//app.use(function(req, res, next) {
//    console.log(req.url)
//    next()
//})
require('dotenv').config()

app.get('/delhiMap', function(req, res) {
    fs.readFile('./delhiMap.json', (err, data) => {
        if (err) throw err
        res.send(JSON.parse(data))
    })
})

app.get('/stateMap', function(req, res) {
    fs.readFile('./state_map.json', (err, data) => {
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