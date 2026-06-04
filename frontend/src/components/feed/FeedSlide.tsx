import { useState } from 'react';
import styled from 'styled-components';
import { ImageOff } from 'lucide-react';
import InfoCluster from './InfoCluster';
import CenteredIcon from '../common/CenteredIcon';
import type { Photo } from '../../types';

interface FeedSlideProps {
  photo: Photo;
  onLike: (id: number) => void;
  likeIsPending?: boolean;
}

export default function FeedSlide({
  photo,
  onLike,
  likeIsPending,
}: FeedSlideProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Slide $avgColor={photo.avg_color}>
      {!imgError ? (
        <SlideImg
          src={photo.src.portrait}
          alt={photo.alt}
          $loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
        />
      ) : (
        <CenteredIcon>
          <ImageOff size={32} color="rgba(255,255,255,0.3)" />
        </CenteredIcon>
      )}
      <Overlay />
      <InfoCluster
        photo={photo}
        onLike={() => onLike(photo.id)}
        likeIsPending={likeIsPending}
      />
    </Slide>
  );
}

const Slide = styled.div<{ $avgColor: string }>`
  height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: ${({ $avgColor }) => $avgColor};

  @media (min-width: 768px) {
    height: 100%;
  }
`;

const SlideImg = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.63) 0%,
    rgba(0, 0, 0, 0.25) 38%,
    transparent 62%
  );
`;
