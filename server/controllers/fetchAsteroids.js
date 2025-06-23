import Asteroid from '../models/Asteroid.js'
import { fetchDailyAsteroids } from '../utils/fetchDailyAsteroids.js'
import cron from 'node-cron'

export const fetchAsteroids = async (req, res) => {
    try {
        const query = {}

        if(req.query.hazardous === 'true'){
            query.hazardous = true
        }
        if(req.query.search){
            query.name = {$regex: req.query.search, $options: 'i'}
        }

        console.log(query)

        const filter = req.query.sortBy
        
        const asteroids = await Asteroid.find(query).sort({[filter]: -1})
        res.status(200).json({success: true, data: asteroids})

    } catch (err) {
        console.log("Error fetching data", err)
        res.status(500).json({success: false, date: err})
    }
}


cron.schedule('0 0 * * *', async () => {
    await fetchDailyAsteroids();
})  




