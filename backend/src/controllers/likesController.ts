import { Request, Response, NextFunction } from 'express';
import { toggleLike } from '../db/likesRepository';

export function togglePhotoLike(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const photoId = Number(req.params.id);
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
