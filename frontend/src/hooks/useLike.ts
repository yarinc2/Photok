import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/photosApi';
import type { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { InfinitePhotosPage } from '../types';

export function useLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: number) => toggleLike(photoId),

    onMutate: async (photoId: number) => {
      await queryClient.cancelQueries({ queryKey: ['photos'] });

      const previous = queryClient.getQueryData<InfiniteData<InfinitePhotosPage>>(['photos']);

      queryClient.setQueryData<InfiniteData<InfinitePhotosPage>>(['photos'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            photos: page.photos.map((p) =>
              p.id === photoId ? { ...p, liked: !p.liked } : p
            ),
          })),
        };
      });

      return { previous };
    },

    onError: (_err, _photoId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['photos'], context.previous);
      }
    },

    onSettled: (_data, _err, photoId) => {
      // Sync the actual server value for this photo's liked state
      queryClient.setQueryData<InfiniteData<InfinitePhotosPage>>(['photos'], (old) => {
        if (!old || !_data) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            photos: page.photos.map((p) =>
              p.id === photoId ? { ...p, liked: _data.liked } : p
            ),
          })),
        };
      });
    },
  });
}
