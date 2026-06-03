import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Liked', to: '/liked' },
];

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 10,
      }}
    >
      {NAV_ITEMS.map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          end
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
            opacity: isActive ? 1 : 0.4,
          })}
        >
          {({ isActive }) => (
            <>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: isActive ? '#fff' : 'transparent',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#fff',
                  letterSpacing: '0.03em',
                }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
