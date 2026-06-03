import { useEffect, useRef } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import { useLike } from '../hooks/useLike';
import FeedSlide from './FeedSlide';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Feed() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    usePhotos();
  const { mutate: like } = useLike();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage onRetry={refetch} />;

  const photos = data?.pages.flatMap((p) => p.photos) ?? [];

  return (
    <div
      className="feed"
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        WebkitOverflowScrolling: 'touch' as any,
      }}
    >
      {photos.map((photo) => (
        <FeedSlide key={photo.id} photo={photo} onLike={like} />
      ))}

      {/* Sentinel placed 2 slides from the end triggers early fetch */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingNextPage && (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0c0c0c',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              border: '2px solid rgba(255,255,255,0.12)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.75s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  );
}
