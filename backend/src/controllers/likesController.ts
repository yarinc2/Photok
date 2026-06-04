import { Request, Response, NextFunction } from 'express';
import { toggleLike, getLikedPhotos, getLikedCount } from '../db/likesRepository';
import { PexelsPhoto } from '../types';

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
    const photo = req.body?.photo as PexelsPhoto | undefined;
    const liked = toggleLike(photoId, photo);
    res.json({ liked });
  } catch (err) {
    next(err);
  }
}

export function getLikedPhotosHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.per_page) || 15;

    const total = getLikedCount();
    const photos = getLikedPhotos(page, perPage);
    const hasMore = page * perPage < total;

    res.json({
      page,
      per_page: perPage,
      total_results: total,
      photos,
      next_page: hasMore ? String(page + 1) : undefined,
    });
  } catch (err) {
    next(err);
  }
}
