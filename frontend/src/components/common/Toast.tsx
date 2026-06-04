import styled, { css } from 'styled-components';

interface ToastProps {
  visible: boolean;
  message: string;
}

export default function Toast({ visible, message }: ToastProps) {
  return <Wrap $visible={visible}>{message}</Wrap>;
}

const Wrap = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $visible }) => ($visible ? '0' : '12px')});
  background: rgba(30, 30, 30, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 13px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  padding: 10px 18px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease, transform 0.2s ease;
  ${({ $visible }) =>
    !$visible &&
    css`
      visibility: hidden;
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s;
    `}
`;
