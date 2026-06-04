import { Router } from 'express';
import { togglePhotoLike, getLikedPhotosHandler } from '../controllers/likesController';

const router = Router();

router.get('/liked', getLikedPhotosHandler);
router.post('/:id/like', togglePhotoLike);

export default router;
