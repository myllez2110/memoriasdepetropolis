import { useMemo, useState } from 'react';
import type { EventItem, View } from './types';
import { news } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { NewsView } from './components/NewsView';
import { EventsView } from './components/EventsView';
import { GalleryView } from './components/GalleryView';
import { AdminView } from './components/AdminView';
import { EventModal } from './components/EventModal';
import { Toast } from './components/Toast';

function App() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [message, setMessage] = useState('');

  const filteredNews = useMemo(
    () => news.filter((item) =>
      `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const registerForEvent = () => {
    setMessage('Sua presença foi registrada. Até lá!');
    setSelectedEvent(null);
  };

  return (
    <div className="app-shell">
      <Header
        view={view}
        menuOpen={menuOpen}
        onNavigate={navigate}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />

      {view === 'admin' ? (
        <AdminView onBack={() => navigate('home')} />
      ) : (
        <>
          {view === 'home' && <HomeView onNavigate={navigate} onEvent={setSelectedEvent} />}
          {view === 'news' && <NewsView items={filteredNews} query={query} setQuery={setQuery} />}
          {view === 'events' && <EventsView onEvent={setSelectedEvent} />}
          {view === 'gallery' && <GalleryView />}
          <Footer onNavigate={navigate} />
        </>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={registerForEvent}
        />
      )}

      <Toast message={message} onDismiss={() => setMessage('')} />
    </div>
  );
}

export default App;
