import InfoCluster from './InfoCluster';
import type { Photo } from '../types';

interface FeedSlideProps {
  photo: Photo;
  onLike: (id: number) => void;
}

export default function FeedSlide({ photo, onLike }: FeedSlideProps) {
  return (
    <div
      style={{
        height: '100vh',
        scrollSnapAlign: 'start',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        background: '#0c0c0c',
      }}
    >
      <img
        src={photo.src.portrait}
        alt={photo.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.63) 0%, rgba(0,0,0,0.25) 38%, transparent 62%)',
        }}
      />

      <InfoCluster photo={photo} onLike={() => onLike(photo.id)} />
    </div>
  );
}
