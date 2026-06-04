import { Home, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavItem {
  label: string;
  to: string;
  Icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', Icon: Home },
  { label: 'Liked', to: '/liked', Icon: Heart },
];

export default function Navbar() {
  return (
    <Nav>
      {NAV_ITEMS.map(({ label, to, Icon }) => (
        <NavItem key={label} to={to} end>
          <Icon size={22} color="#fff" />
          <NavLabel>{label}</NavLabel>
        </NavItem>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 10;

  @media (min-width: 768px) {
    position: absolute;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  opacity: 0.4;
  transition: opacity 0.15s ease;

  &.active {
    opacity: 1;
  }
`;

const NavLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.03em;
`;
