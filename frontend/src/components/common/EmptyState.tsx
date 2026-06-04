import { Inbox } from 'lucide-react';
import styled from 'styled-components';
import RetryButton from './RetryButton';
import StatusMessage from './StatusMessage';

interface EmptyStateProps {
  onRetry: () => void;
}

export default function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <Wrap>
      <Inbox size={36} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
      <StatusMessage>No photos available right now.</StatusMessage>
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
  gap: 14px;
  background: #0c0c0c;
`;
