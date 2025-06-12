import axios from 'axios'
import Asteroid from '../models/Asteroid.js';
import dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.API_KEY

export const fetchDailyAsteroids = async (date) => {
    const priorWeek = date || fetchDaily()

    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${priorWeek}&end_date=&api_key=${API_KEY}`)
    const rawData = response.data.near_earth_objects; //getting the objects from the api
    const dateKeys = Object.keys(rawData) //Getting Asteroid Dates

    const allAsteroids = [];
    dateKeys.forEach(date => {
        rawData[date].forEach(asteroid => {

            const dateStr = asteroid.close_approach_data[0].close_approach_date_full;
            const dateObj = new Date(dateStr);
            allAsteroids.push({
                name: asteroid.name,
                close_approach_date: asteroid.close_approach_data[0].close_approach_date_full,
                date: dateObj,
                estimated_diameter_km: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                miss_distance_km:  Number(asteroid.close_approach_data[0].miss_distance.kilometers),
                velocity_kph: Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
                hazardous: asteroid.is_potentially_hazardous_asteroid
            })
        })
    })

    for(const asteroid of allAsteroids) {
        const exists = await Asteroid.findOne({
            name: asteroid.name,
            close_approach_date: asteroid.close_approach_date
        })
        if(!exists){
            await Asteroid.create(asteroid)
        }
    }

    return allAsteroids
}


const fetchDaily = () => {
    const today = new Date()
    today.setDate(today.getDate() - 7)
    return today.toISOString().split('T')[0]
}