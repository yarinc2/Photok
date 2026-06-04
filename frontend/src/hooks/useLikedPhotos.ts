import { useInfiniteQuery } from '@tanstack/react-query';
import { getLikedPhotos } from '../api/photosApi';
import { PER_PAGE, QueryKey } from '../config/consts';

export function useLikedPhotos() {
  return useInfiniteQuery({
    queryKey: [QueryKey.LIKED],
    queryFn: ({ pageParam }) => getLikedPhotos(pageParam as number, PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page) return undefined;
      return lastPage.page + 1;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
