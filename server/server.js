import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import routes from './routes/routes.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors());
app.use(morgan("dev"))

app.use("/astroX", routes)

mongoose.connect("mongodb://localhost:27017/asteroidnasa")
    .then(() => console.log("Successfully Connected"))
    .catch((err) => console.log("Error during connection"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))