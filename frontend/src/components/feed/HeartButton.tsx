import { useState } from 'react';
import { Heart } from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

interface HeartButtonProps {
  liked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function HeartButton({ liked, onClick, disabled }: HeartButtonProps) {
  const [anim, setAnim] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setAnim(false);
    requestAnimationFrame(() => {
      setAnim(true);
      onClick();
    });
  };

  return (
    <Btn
      $anim={anim}
      $disabled={!!disabled}
      onClick={handleClick}
      onAnimationEnd={() => setAnim(false)}
      aria-label={liked ? 'Unlike' : 'Like'}
      aria-pressed={liked}
    >
      <Heart
        size={18}
        fill={liked ? '#ff3d5a' : 'none'}
        color={liked ? '#ff3d5a' : 'rgba(255,255,255,0.85)'}
        strokeWidth={1.75}
      />
    </Btn>
  );
}

const heartPop = keyframes`
  0%, 100% { transform: scale(1); }
  40%       { transform: scale(1.45); }
  70%       { transform: scale(0.92); }
`;

const Btn = styled.button<{ $anim: boolean; $disabled: boolean }>`
  background: none;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  padding: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 13px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  -webkit-tap-highlight-color: transparent;
  transform-origin: left center;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  transition: opacity 0.15s ease;
  ${({ $anim }) =>
    $anim &&
    css`
      animation: ${heartPop} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `}
`;
