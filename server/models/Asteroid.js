import mongoose from 'mongoose'

const asteroidSchema = new mongoose.Schema({
    name: String,
    close_approach_date: String,
    date: Date,
    estimated_diameter_km: Number,
    miss_distance_km: Number,
    velocity_kph: Number,
    hazardous: Boolean
})
asteroidSchema.index({ name: 1, close_approach_date: 1 }, { unique: true });
export default mongoose.model("Asteroids", asteroidSchema)