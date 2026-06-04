import styled from 'styled-components';

interface ErrorMessageProps {
  onRetry: () => void;
  code?: string;
}

const CODE_MESSAGES: Record<string, string> = {
  RATE_LIMITED: 'Too many requests, please try again later.',
  FORBIDDEN: 'Access denied. There may be a configuration issue.',
  UNAUTHORIZED: 'Access denied. There may be a configuration issue.',
  NOT_FOUND: 'The requested resource could not be found.',
  UPSTREAM_ERROR: 'The image service is unavailable. Try again shortly.',
};

export default function ErrorMessage({ onRetry, code }: ErrorMessageProps) {
  const message =
    (code && CODE_MESSAGES[code]) ??
    'Could not load photos. Check your connection or API key.';

  return (
    <Wrap>
      <Message>{message}</Message>
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
  gap: 16px;
  background: #0c0c0c;
  padding: 0 24px;
  text-align: center;
`;

const Message = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 400;
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
