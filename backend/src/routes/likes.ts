import { Router } from 'express';
import { togglePhotoLike } from '../controllers/likesController';

const router = Router();

router.post('/:id/like', togglePhotoLike);

export default router;
