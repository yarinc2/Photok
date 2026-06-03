import { getLikedIds } from '../db/likesRepository';
import { PexelsPhoto, PhotoWithLike } from '../types';

export function enrichWithLikes(photos: PexelsPhoto[]): PhotoWithLike[] {
  const ids = photos.map((p) => p.id);
  const likedSet = getLikedIds(ids);
  return photos.map((p) => ({ ...p, liked: likedSet.has(p.id) }));
}
