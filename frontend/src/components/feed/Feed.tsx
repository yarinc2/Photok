import { useRef } from 'react';
import styled from 'styled-components';
import { usePhotos } from '../../hooks/usePhotos';
import { useLike } from '../../hooks/useLike';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { getErrorCode } from '../../utils/apiError';
import FeedSlide from './FeedSlide';
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
  const { mutate: like } = useLike();
  const feedRef = useRef<HTMLDivElement>(null);

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
        <FeedSlide key={photo.id} photo={photo} onLike={like} />
      ))}

      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingNextPage && <LoadingSpinner />}
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
`;
