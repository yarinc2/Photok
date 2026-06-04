import styled, { keyframes } from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Wrap>
      <Ring />
    </Wrap>
  );
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrap = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0c0c0c;
`;

const Ring = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;
