import { useState } from 'react';
import { Heart } from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

interface HeartButtonProps {
  liked: boolean;
  onClick: () => void;
}

export default function HeartButton({ liked, onClick }: HeartButtonProps) {
  const [anim, setAnim] = useState(false);

  const handleClick = () => {
    setAnim(false);
    requestAnimationFrame(() => {
      setAnim(true);
      onClick();
    });
  };

  return (
    <Btn $anim={anim} onClick={handleClick} onAnimationEnd={() => setAnim(false)}>
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

const Btn = styled.button<{ $anim: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
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
  ${({ $anim }) =>
    $anim &&
    css`
      animation: ${heartPop} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `}
`;
