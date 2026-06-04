import styled from 'styled-components';
import Feed from '../components/feed/Feed';
import Navbar from '../components/layout/Navbar';

export default function HomeView() {
  return (
    <AppWrapper>
      <Feed />
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
