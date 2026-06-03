import styled from 'styled-components';
import InfoCluster from './InfoCluster';
import type { Photo } from '../types';

interface FeedSlideProps {
  photo: Photo;
  onLike: (id: number) => void;
}

export default function FeedSlide({ photo, onLike }: FeedSlideProps) {
  return (
    <Slide>
      <SlideImg src={photo.src.portrait} alt={photo.alt} />
      <Overlay />
      <InfoCluster photo={photo} onLike={() => onLike(photo.id)} />
    </Slide>
  );
}

const Slide = styled.div`
  height: 100dvh;
  scroll-snap-align: start;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: #0c0c0c;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
