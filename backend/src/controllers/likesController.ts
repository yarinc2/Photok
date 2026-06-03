import { Request, Response, NextFunction } from 'express';
import { toggleLike } from '../db/likesRepository';

export function togglePhotoLike(req: Request, res: Response, next: NextFunction) {
  try {
    const photoId = parseInt(String(req.params.id), 10);
    if (isNaN(photoId)) {
      res.status(400).json({ error: 'Invalid photo id' });
      return;
    }
    const liked = toggleLike(photoId);
    res.json({ liked });
  } catch (err) {
    next(err);
  }
}
