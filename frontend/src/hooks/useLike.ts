import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../api/photosApi';
import type { InfiniteData } from '@tanstack/react-query';
import type { InfinitePhotosPage, Photo } from '../types';
import { togglePhotoLikeInPages } from '../utils/togglePhotoLikeInPages';
import { removePhotoFromPages } from '../utils/removePhotoFromPages';
import { QueryKey } from '../config/consts';

interface UseLikeOptions {
  removeOnUnlike?: boolean;
}

export function useLike(
  queryKey: QueryKey[],
  invalidateKeys: QueryKey[][] = [],
  options: UseLikeOptions = {},
) {
  const queryClient = useQueryClient();
  const { removeOnUnlike = false } = options;

  const mutation = useMutation({
    mutationFn: (photo: Photo) => toggleLike(photo),

    onMutate: async (photo: Photo) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<
        InfiniteData<InfinitePhotosPage>
      >(queryKey);

      queryClient.setQueryData<InfiniteData<InfinitePhotosPage>>(
        queryKey,
        (old) =>
          removeOnUnlike
            ? removePhotoFromPages(old, photo.id)
            : togglePhotoLikeInPages(old, photo.id),
      );

      return { previous };
    },

    onError: (_err, _photo, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSuccess: () => {
      invalidateKeys.forEach((k) => queryClient.invalidateQueries({ queryKey: k }));
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    variables: mutation.variables,
  };
}
