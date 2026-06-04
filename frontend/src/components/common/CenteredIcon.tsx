import type { ReactNode } from 'react';
import styled from 'styled-components';

interface CenteredIconProps {
  children: ReactNode;
}

export default function CenteredIcon({ children }: CenteredIconProps) {
  return <Wrap>{children}</Wrap>;
}

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
