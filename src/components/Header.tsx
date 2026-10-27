import { Menu, Moon, Sun, X } from 'lucide-react';
import type { View } from '../types';
import { Logo } from './Logo';

type HeaderProps = {
  view: View;
  menuOpen: boolean;
  onNavigate: (view: View) => void;
  onToggleMenu: () => void;
  dark: boolean;
  onToggleDark: () => void;
};

const navItems: [View, string][] = [
  ['home', 'Início'],
  ['memoria', 'Folha da Memória'],
  ['artigos', 'Artigos'],
  ['gallery', 'Galeria'],
  ['equipe', 'Equipe'],
];

export function Header({ view, menuOpen, onNavigate, onToggleMenu, dark, onToggleDark }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => onNavigate('home')} aria-label="Ir para o início">
          <Logo dark={dark} />
        </button>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map(([key, label]) => (
            <button key={key} className={view === key ? 'active' : ''} onClick={() => onNavigate(key)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={onToggleDark}
            aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={dark ? 'Modo claro' : 'Modo escuro'}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="menu-button" onClick={onToggleMenu} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
