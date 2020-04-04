const Pool = require('pg').Pool
const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config()

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

const insertUsers = (n, m) => {
    fs.readFile('./delhiDummyPoint.json', (err, data) => {
        if (err) throw err;
        jsonData = JSON.parse(data)
        const text = 'INSERT INTO form_points(lat, long, mag) VALUES($1, $2, $3);'
        for (let i = n; i < m; i++) {
            const values = [jsonData[i].location.lat, jsonData[i].location.lng, jsonData[i].weight]
            pool.query(text, values, (error, results) => {
                if (error) throw error
                console.log(results)
                //response.status(200).json(results.rows)
            })
        }
    })
}

function getPoints() {
    const text = 'SELECT id, lat, long from form_points;'
    return new Promise((resolve, reject) => {
        pool.query(text, (err, data) => {
            if (err) throw err
            resolve(data.rows)
        })
    })
}

/*const getPoints = async () => {
    const text = 'SELECT id, lat, long from form_points;'
    values = ['id', 'lat', 'long']
    const resp = await pool.query(text)
    await pool.query(text)
        .then((res) => {
            console.log(res.rows[0])
            return res.rows
        }) // brianc
        .catch(err => console.error('Error executing query', err.stack))
}*/

const updateDistrict = (data) => {
    const text = 'UPDATE form_points SET district=$1 WHERE id=$2;'
    for(let i = 0; i < data.length; i++) {
        const values = [data[i][1], data[i][0]]
        pool.query(text, values, (error, results) => {
            if (error) throw error
            //console.log(results.rowCount)
            //response.status(200).json(results.rows)
        })
    }
}

const getDistrictWiseData = () => {
    const text = 'SELECT district, AVG(mag) FROM form_points GROUP BY district;'
    return new Promise((resolve, reject) => {
        pool.query(text, (err, data) => {
            if (err) throw err
            console.log(data.rows)
            resolve(data.rows)
        })
    })
}

module.exports = {
    insertUsers,
    getPoints,
    updateDistrict,
    getDistrictWiseData
}