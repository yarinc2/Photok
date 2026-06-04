import { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { usePhotos } from '../../hooks/usePhotos';
import { useLike } from '../../hooks/useLike';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { getErrorCode } from '../../utils/apiError';
import FeedSlide from './FeedSlide';
import Toast from '../common/Toast';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

export default function Feed() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePhotos();

  const {
    mutate: likeMutate,
    isPending: likeIsPending,
    variables: likePhotoId,
  } = useLike();

  const feedRef = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const like = useCallback(
    (photoId: number) => {
      likeMutate(photoId, {
        onError: () => {
          if (toastTimer.current) clearTimeout(toastTimer.current);
          setToastVisible(true);
          toastTimer.current = setTimeout(() => setToastVisible(false), 1500);
        },
      });
    },
    [likeMutate],
  );

  const sentinelRef = useInfiniteScroll({
    rootRef: feedRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <ErrorMessage code={getErrorCode(error)} onRetry={refetch} />;

  const photos = data?.pages.flatMap((p) => p.photos) ?? [];

  if (photos.length === 0) return <EmptyState onRetry={refetch} />;

  return (
    <FeedContainer ref={feedRef}>
      {photos.map((photo) => (
        <FeedSlide
          key={photo.id}
          photo={photo}
          onLike={like}
          likeIsPending={likeIsPending && likePhotoId === photo.id}
        />
      ))}

      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingNextPage && <LoadingSpinner />}
      <Toast visible={toastVisible} message="Couldn't update. Try again." />
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    height: 100%;
  }
`;
