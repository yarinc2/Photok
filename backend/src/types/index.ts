export interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  alt: string;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
}

export interface PhotoWithLike extends PexelsPhoto {
  liked: boolean;
}

export interface PhotosResponse {
  page: number;
  per_page: number;
  total_results: number;
  photos: PhotoWithLike[];
  next_page?: string;
}
