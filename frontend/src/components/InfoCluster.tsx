import HeartButton from './HeartButton';
import type { Photo } from '../types';

interface InfoClusterProps {
  photo: Photo;
  onLike: () => void;
}

function ExternalArrow() {
  return (
    <svg
      width={9}
      height={9}
      viewBox="0 0 10 10"
      fill="none"
      style={{ display: 'inline', marginLeft: 3 }}
    >
      <path
        d="M2 8L8 2M8 2H3.5M8 2V6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PexelsLogo() {
  return (
    <svg width={13} height={13} viewBox="0 0 32 32" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="32" height="32" rx="5" fill="#05A081" />
      <text
        x="16"
        y="23"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="19"
        fill="white"
      >
        P
      </text>
    </svg>
  );
}

export default function InfoCluster({ photo, onLike }: InfoClusterProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 22,
        right: 22,
      }}
    >
      <div
        style={{
          fontSize: 19,
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '-0.015em',
          lineHeight: 1.2,
          marginBottom: 5,
          textShadow: '0 1px 6px rgba(0,0,0,0.25)',
        }}
      >
        {photo.alt}
      </div>

      <a
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: 12,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.62)',
          textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        Photo by {photo.photographer} on Pexels
        <ExternalArrow />
      </a>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HeartButton liked={photo.liked} onClick={onLike} />

        <a
          href="https://www.pexels.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.42)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          <PexelsLogo />
          Photos provided by Pexels
        </a>
      </div>
    </div>
  );
}
