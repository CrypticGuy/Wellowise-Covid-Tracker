const { featureCollection, point, polygon } = require('@turf/helpers')
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default
const fs = require('fs')
const {getPoints, updateDistrict} = require('./pool')

/**
 *  EXAMPLE: 
 *  var pt = turf.point([-77, 44]);
 *  var poly = turf.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 *   ]]);
 *
 *   turf.booleanPointInPolygon(pt, poly);
 */

var delhiStatePolygon;
fs.readFile('./delhiMap.json', (err, data) => {
    if (err) throw err;
    delhiStatePolygon = JSON.parse(data)
    //console.log(delhiStatePolygon)
    calculatePointAndTheirPolygons(delhiStatePolygon)
})

async function calculatePointAndTheirPolygons(arr) {
    //const pointsData = await getPoints()
    //console.log("Points: ", pointsData)
    let features = arr.features
    getPoints()
        .then((data) => {
            toReturn = []
            for(let i = 0; i < data.length; i++) {
                let pt = point([data[i].long, data[i].lat]);
                for (let j = 0; j < arr.features.length; j++) {
                    if (booleanPointInPolygon(pt, arr.features[j])) {
                        temp = [data[i].id, arr.features[j].properties.DISTRICT]
                        toReturn.push(temp)
                    }
                }
            }
            return toReturn
        })
        .then((toReturn) => {
            updateDistrict(toReturn)
        })
        .catch(err => console.log(err))
    //await getPoints().then((data) => console.log("Points Data: ", data))
    //console.log(features)
    
    //for(let i = 0; i < pointsData.length; i++) {
    //    let pt = point([pointsData[i].lng, pointsData[i].lat]);
    //}
}
