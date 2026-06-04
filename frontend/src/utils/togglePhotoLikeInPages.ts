import type { InfiniteData } from '@tanstack/react-query';
import type { InfinitePhotosPage } from '../types';

export function togglePhotoLikeInPages(
  old: InfiniteData<InfinitePhotosPage> | undefined,
  photoId: number,
): InfiniteData<InfinitePhotosPage> | undefined {
  if (!old) return old;
  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      photos: page.photos.map((p) =>
        p.id === photoId ? { ...p, liked: !p.liked } : p,
      ),
    })),
  };
}
