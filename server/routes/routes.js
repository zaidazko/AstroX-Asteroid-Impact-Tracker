import express from 'express';
import { fetchAsteroids } from '../controllers/fetchAsteroids.js';

const router = express.Router();

router.get("/", fetchAsteroids)


export default router;