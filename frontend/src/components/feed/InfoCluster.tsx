import { ArrowUpRight } from 'lucide-react';
import styled from 'styled-components';
import HeartButton from '../common/HeartButton';
import PexelsLogo from '../common/PexelsLogo';
import ProviderAttribution from '../common/ProviderAttribution';
import type { Photo } from '../../types';

interface InfoClusterProps {
  photo: Photo;
  onLike: () => void;
  likeIsPending?: boolean;
}

export default function InfoCluster({
  photo,
  onLike,
  likeIsPending,
}: InfoClusterProps) {
  return (
    <Cluster>
      <Title>{photo.alt}</Title>

      <CreditLink href={photo.url} target="_blank" rel="noopener noreferrer">
        Photo by {photo.photographer}
        <ArrowUpRight size={11} style={{ display: 'inline', marginLeft: 3 }} />
      </CreditLink>

      <Actions>
        <HeartButton
          liked={photo.liked}
          onClick={onLike}
          disabled={likeIsPending}
        />

        <ProviderAttribution
          href="https://www.pexels.com"
          logo={<PexelsLogo />}
          text="Photos provided by Pexels"
        />
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
