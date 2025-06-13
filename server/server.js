import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import routes from './routes/routes.js'
import { fetchDailyAsteroids } from './utils/fetchDailyAsteroids.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const allowedOrigins = [
    'http://localhost:5173',                    // for local dev
    'https://astrox-frontend.onrender.com'      // for production frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    credentials: true // optional: allow cookies/auth
}));

app.use(morgan("dev"))

app.use("/astroX", routes)

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB Atlas")
        //fetch asteroids
        await fetchDailyAsteroids();
        console.log("Initial Data Fetched")
    })
    .catch((err) => console.log("MongoDB Connection Error"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))