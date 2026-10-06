import { Menu, X } from 'lucide-react';
import type { View } from '../types';
import { Logo } from './Logo';

type HeaderProps = {
  view: View;
  menuOpen: boolean;
  onNavigate: (view: View) => void;
  onToggleMenu: () => void;
};

const navItems: [View, string][] = [
  ['home', 'Início'],
  ['memoria', 'Folha da Memória'],
  ['artigos', 'Artigos'],
  ['gallery', 'Galeria'],
  ['equipe', 'Equipe'],
];

export function Header({ view, menuOpen, onNavigate, onToggleMenu }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => onNavigate('home')} aria-label="Ir para o início">
          <Logo />
        </button>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map(([key, label]) => (
            <button key={key} className={view === key ? 'active' : ''} onClick={() => onNavigate(key)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="menu-button" onClick={onToggleMenu} aria-label="Abrir menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
