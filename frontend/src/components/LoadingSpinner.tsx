export default function LoadingSpinner() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c0c0c',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(255,255,255,0.12)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  );
}
