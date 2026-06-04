import client from './client';
import type { InfinitePhotosPage, Photo } from '../types';

export async function getPhotos(page: number, perPage: number): Promise<InfinitePhotosPage> {
  const res = await client.get<InfinitePhotosPage>('/api/photos', {
    params: { page, per_page: perPage },
  });
  return res.data;
}

export async function getLikedPhotos(page: number, perPage: number): Promise<InfinitePhotosPage> {
  const res = await client.get<InfinitePhotosPage>('/api/photos/liked', {
    params: { page, per_page: perPage },
  });
  return res.data;
}

export async function toggleLike(photo: Photo): Promise<{ liked: boolean }> {
  const res = await client.post<{ liked: boolean }>(`/api/photos/${photo.id}/like`, { photo });
  return res.data;
}
