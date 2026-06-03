import { useRef, useState } from 'react';

interface HeartButtonProps {
  liked: boolean;
  onClick: () => void;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={filled ? '#ff3d5a' : 'none'}
        stroke={filled ? '#ff3d5a' : 'rgba(255,255,255,0.85)'}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeartButton({ liked, onClick }: HeartButtonProps) {
  const [anim, setAnim] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setAnim(false);
    requestAnimationFrame(() => {
      setAnim(true);
      onClick();
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={anim ? 'heart-pop' : ''}
      onAnimationEnd={() => setAnim(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: 'rgba(255,255,255,0.88)',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        WebkitTapHighlightColor: 'transparent',
        transformOrigin: 'left center',
      }}
    >
      <HeartIcon filled={liked} />
    </button>
  );
}
