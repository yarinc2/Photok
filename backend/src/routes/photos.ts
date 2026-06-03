import { Router } from 'express';
import { getCuratedPhotos } from '../controllers/photosController';

const router = Router();

router.get('/', getCuratedPhotos);

export default router;
