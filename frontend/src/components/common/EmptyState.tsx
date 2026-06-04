import styled from 'styled-components';

interface EmptyStateProps {
  onRetry: () => void;
}

export default function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <Wrap>
      <Message>No photos available right now.</Message>
      <RetryButton onClick={onRetry}>Refresh</RetryButton>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #0c0c0c;
`;

const Message = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  margin: 0;
`;

const RetryButton = styled.button`
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
