import type { ReactNode } from 'react';
import styled from 'styled-components';

interface ProviderAttributionProps {
  href: string;
  logo: ReactNode;
  text: string;
}

export default function ProviderAttribution({ href, logo, text }: ProviderAttributionProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {logo}
      {text}
    </Link>
  );
}

const Link = styled.a`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.42);
  text-decoration: none;
  letter-spacing: 0.02em;
`;
