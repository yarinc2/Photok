import type { InfiniteData } from '@tanstack/react-query';
import type { InfinitePhotosPage } from '../types';

export function removePhotoFromPages(
  old: InfiniteData<InfinitePhotosPage> | undefined,
  photoId: number,
): InfiniteData<InfinitePhotosPage> | undefined {
  if (!old) return old;
  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      photos: page.photos.filter((p) => p.id !== photoId),
    })),
  };
}
