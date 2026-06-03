import { useInfiniteQuery } from '@tanstack/react-query';
import { getPhotos } from '../api/photosApi';
import { PER_PAGE } from '../config/consts';

export function usePhotos() {
  return useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => getPhotos(pageParam as number, PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page) return undefined;
      return lastPage.page + 1;
    },
  });
}
