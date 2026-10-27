import { useEffect, useState } from 'react';
import type { View } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MemoriaView } from './components/MemoriaView';
import { ArtigosView } from './components/ArtigosView';
import { GalleryView } from './components/GalleryView';
import { EquipeView } from './components/EquipeView';

function App() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('mp-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    localStorage.setItem('mp-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app-shell${dark ? ' dark' : ''}`}>
      <Header
        view={view}
        menuOpen={menuOpen}
        onNavigate={navigate}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
      />

      {view === 'home' && <HomeView onNavigate={navigate} />}
      {view === 'memoria' && <MemoriaView />}
      {view === 'artigos' && <ArtigosView />}
      {view === 'gallery' && <GalleryView />}
      {view === 'equipe' && <EquipeView />}

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
