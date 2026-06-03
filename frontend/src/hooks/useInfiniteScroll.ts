import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollOptions {
  rootRef: RefObject<Element | null>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({
  rootRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const rootHeight = rootRef.current?.clientHeight ?? window.innerHeight;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: rootRef.current,
        rootMargin: `0px 0px ${rootHeight * 2}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [rootRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return sentinelRef;
}
