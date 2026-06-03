import { Request, Response, NextFunction } from 'express';
import { getPhotos } from '../services/pexelsService';
import { enrichWithLikes } from '../services/likesService';

export async function getCuratedPhotos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.per_page) || 15;

    const pexelsData = await getPhotos(page, perPage);
    const photos = enrichWithLikes(pexelsData.photos);

    res.json({
      page: pexelsData.page,
      per_page: pexelsData.per_page,
      total_results: pexelsData.total_results,
      photos,
      next_page: pexelsData.next_page,
    });
  } catch (err) {
    next(err);
  }
}
