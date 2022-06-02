import express from 'express';
const router = express.Router();

import HomeController from '../controllers/home.js';
import { RegisterController, LoginController } from '../controllers/login.js';
import { DataController, SearchController } from '../controllers/data.js';

router.get('/', HomeController);
router.get('/data', DataController);
router.get('/data/search', SearchController);

router.post('/register', RegisterController);
router.post('/login', LoginController);

export default router