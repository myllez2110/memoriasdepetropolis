import { useState } from 'react';
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

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Header
        view={view}
        menuOpen={menuOpen}
        onNavigate={navigate}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
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
