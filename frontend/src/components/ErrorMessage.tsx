interface ErrorMessageProps {
  onRetry: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: '#0c0c0c',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 400, margin: 0 }}>
        Could not load photos. Check your connection or API key.
      </p>
      <button
        onClick={onRetry}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8,
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
          padding: '10px 20px',
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Try again
      </button>
    </div>
  );
}
