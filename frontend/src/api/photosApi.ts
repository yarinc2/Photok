import client from './client';
import type { InfinitePhotosPage } from '../types';

export async function getPhotos(page: number, perPage: number): Promise<InfinitePhotosPage> {
  const res = await client.get<InfinitePhotosPage>('/api/photos', {
    params: { page, per_page: perPage },
  });
  return res.data;
}

export async function toggleLike(photoId: number): Promise<{ liked: boolean }> {
  const res = await client.post<{ liked: boolean }>(`/api/photos/${photoId}/like`);
  return res.data;
}
