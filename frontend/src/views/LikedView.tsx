import styled from 'styled-components';
import LikedFeed from '../components/feed/LikedFeed';
import Navbar from '../components/layout/Navbar';

export default function LikedView() {
  return (
    <AppWrapper>
      <LikedFeed />
      <Navbar />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 500px;
    height: 78dvh;
    border-radius: 20px;
    overflow: hidden;
    flex-shrink: 0;
  }
`;
