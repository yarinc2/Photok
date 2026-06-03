import { ArrowUpRight } from 'lucide-react';
import styled from 'styled-components';
import HeartButton from './HeartButton';
import PexelsLogo from './PexelsLogo';
import type { Photo } from '../types';

interface InfoClusterProps {
  photo: Photo;
  onLike: () => void;
}

export default function InfoCluster({ photo, onLike }: InfoClusterProps) {
  return (
    <Cluster>
      <Title>{photo.alt}</Title>

      <CreditLink href={photo.url} target="_blank" rel="noopener noreferrer">
        Photo by {photo.photographer}
        <ArrowUpRight size={11} style={{ display: 'inline', marginLeft: 3 }} />
      </CreditLink>

      <Actions>
        <HeartButton liked={photo.liked} onClick={onLike} />

        <PexelsLink href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">
          <PexelsLogo />
          Photos provided by Pexels
        </PexelsLink>
      </Actions>
    </Cluster>
  );
}

const Cluster = styled.div`
  position: absolute;
  bottom: 80px;
  left: 22px;
  right: 22px;
`;

const Title = styled.p`
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin-bottom: 5px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
`;

const CreditLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.62);
  text-decoration: none;
  margin-bottom: 14px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const PexelsLink = styled.a`
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
