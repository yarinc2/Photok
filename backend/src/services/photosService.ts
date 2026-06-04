import axios from 'axios';
import { PEXELS_API_KEY, PEXELS_BASE_URL } from '../config/consts';
import { PexelsResponse } from '../types';

export async function getPhotos(page: number, perPage: number): Promise<PexelsResponse> {
  const response = await axios.get<PexelsResponse>(`${PEXELS_BASE_URL}/curated`, {
    headers: { Authorization: PEXELS_API_KEY },
    params: { page, per_page: perPage },
  });
  return response.data;
}
