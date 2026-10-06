import { Facebook, Instagram, Mail, Youtube } from 'lucide-react';
import type { View } from '../types';
import { Logo } from './Logo';

type FooterProps = {
  onNavigate: (view: View) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo dark />
          <p>Histórias, pessoas e ações<br />que cuidam de Petrópolis.</p>
        </div>
        <div className="footer-links">
          <span>Explorar</span>
          <button onClick={() => onNavigate('news')}>Notícias</button>
          <button onClick={() => onNavigate('events')}>Eventos</button>
          <button onClick={() => onNavigate('gallery')}>Galeria</button>
        </div>
        <div className="footer-links">
          <span>Fale com a gente</span>
          <a href="mailto:contato@sosserra.org.br"><Mail size={15} /> contato@sosserra.org.br</a>
          <div className="socials">
            <a href="#instagram" aria-label="Instagram"><Instagram size={17} /></a>
            <a href="#facebook" aria-label="Facebook"><Facebook size={17} /></a>
            <a href="#youtube" aria-label="Youtube"><Youtube size={17} /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 SOS Serra. Feito com cuidado em Petrópolis.</span>
        <span>Transparência · Privacidade</span>
      </div>
    </footer>
  );
}
