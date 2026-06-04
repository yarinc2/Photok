import { WifiOff, AlertCircle } from 'lucide-react';
import styled from 'styled-components';
import RetryButton from './RetryButton';
import StatusMessage from './StatusMessage';

interface ErrorMessageProps {
  onRetry: () => void;
  code?: string;
}

const CODE_MESSAGES: Record<string, string> = {
  RATE_LIMITED: 'Too many requests — please wait a moment.',
  FORBIDDEN: 'Access denied. There may be a configuration issue.',
  UNAUTHORIZED: 'Access denied. There may be a configuration issue.',
  NOT_FOUND: 'The requested resource could not be found.',
  UPSTREAM_ERROR: 'The image service is unavailable. Try again shortly.',
  INTERNAL_ERROR: 'Something went wrong on the server.',
};

const NETWORK_CODES = new Set(['UPSTREAM_ERROR', 'RATE_LIMITED']);

export default function ErrorMessage({ onRetry, code }: ErrorMessageProps) {
  const message =
    (code && CODE_MESSAGES[code]) ??
    'Could not load photos. Check your connection.';

  const Icon = code && NETWORK_CODES.has(code) ? WifiOff : AlertCircle;

  return (
    <Wrap>
      <Icon size={36} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
      <StatusMessage>{message}</StatusMessage>
      <RetryButton onClick={onRetry}>Try again</RetryButton>
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
  padding: 0 24px;
  text-align: center;
`;
