import express from 'express';
const router = express.Router();
import services from '../controllers/service-controller.js'

router.route('/service').get(services);

export default router; 