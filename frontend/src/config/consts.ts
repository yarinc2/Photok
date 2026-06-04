export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const PER_PAGE = 15;

export const QueryKey = {
  PHOTOS: 'photos',
  LIKED: 'liked',
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];
