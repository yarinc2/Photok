import type { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface RetryButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function RetryButton({ onClick, children }: RetryButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
`;
