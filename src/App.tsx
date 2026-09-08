import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Edit3,
  Facebook,
  GalleryHorizontalEnd,
  Instagram,
  Leaf,
  Mail,
  Menu,
  Mountain,
  Newspaper,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Youtube,
} from 'lucide-react';

type View = 'home' | 'news' | 'events' | 'gallery' | 'admin';
type NewsItem = { title: string; excerpt: string; category: string; date: string; image: string };

type EventItem = { title: string; date: string; day: string; month: string; time: string; place: string; description: string };

const images = {
  hero: 'https://images.pexels.com/photos/8533860/pexels-photo-8533860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mountain: 'https://images.pexels.com/photos/30057008/pexels-photo-30057008.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sunrise: 'https://images.pexels.com/photos/12931460/pexels-photo-12931460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ridge: 'https://images.pexels.com/photos/17767111/pexels-photo-17767111.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dawn: 'https://images.pexels.com/photos/16960973/pexels-photo-16960973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  forest: 'https://images.pexels.com/photos/15639315/pexels-photo-15639315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const news: NewsItem[] = [
  { title: 'SOS Serra promove mutirão de recuperação de nascentes', excerpt: 'Comunidade se reúne para cuidar das águas que atravessam os bairros da serra.', category: 'Ação comunitária', date: '12 jun 2026', image: images.mountain },
  { title: 'Memórias de Petrópolis: histórias que a serra guarda', excerpt: 'Uma conversa com moradores que ajudam a preservar a memória de cada encosta.', category: 'Memórias', date: '04 jun 2026', image: images.dawn },
  { title: 'Campanha de inverno arrecada cobertores e agasalhos', excerpt: 'A mobilização já alcançou 180 famílias e segue recebendo doações.', category: 'Campanhas', date: '28 mai 2026', image: images.forest },
];

const events: EventItem[] = [
  { title: 'Roda de conversa: a força da comunidade', date: '20 JUN 2026', day: '20', month: 'JUN', time: '10:00', place: 'Centro Comunitário da Serra', description: 'Um encontro aberto para compartilhar histórias, desafios e próximos passos do território.' },
  { title: 'Mutirão pela Serra', date: '27 JUN 2026', day: '27', month: 'JUN', time: '08:00', place: 'Praça do Alto da Serra', description: 'Vamos cuidar juntos dos caminhos, praças e áreas verdes que fazem parte da nossa casa.' },
  { title: 'Feira de projetos locais', date: '04 JUL 2026', day: '04', month: 'JUL', time: '14:00', place: 'Galpão da Estação', description: 'Uma tarde para conhecer iniciativas, produtores e talentos que movimentam a região.' },
];

const gallery = [
  { image: images.hero, title: 'A serra ao amanhecer' },
  { image: images.mountain, title: 'Caminhos da comunidade' },
  { image: images.sunrise, title: 'Cuidar das nascentes' },
  { image: images.ridge, title: 'Mutirão pela Serra' },
  { image: images.dawn, title: 'Memórias vivas' },
  { image: images.forest, title: 'Natureza que aproxima' },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return <div className={`brand ${dark ? 'brand-dark' : ''}`}><span className="brand-mark"><Mountain size={21} strokeWidth={2.2} /></span><span><strong>SOS</strong><small>SERRA</small></span></div>;
}

function App() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [message, setMessage] = useState('');

  const filteredNews = useMemo(() => news.filter((item) => `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const navigate = (next: View) => { setView(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div className="app-shell">
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => navigate('home')} aria-label="Ir para o início"><Logo /></button>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {([['home', 'Início'], ['news', 'Notícias'], ['events', 'Eventos'], ['gallery', 'Galeria']] as [View, string][]).map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => navigate(key)}>{label}</button>)}
          <button className="admin-link" onClick={() => navigate('admin')}><ShieldCheck size={15} /> Área administrativa</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    {view === 'admin' ? <AdminView onBack={() => navigate('home')} /> : <>
      {view === 'home' && <HomeView onNavigate={navigate} onEvent={setSelectedEvent} />}
      {view === 'news' && <NewsView items={filteredNews} query={query} setQuery={setQuery} />}
      {view === 'events' && <EventsView onEvent={setSelectedEvent} />}
      {view === 'gallery' && <GalleryView />}
      <Footer onNavigate={navigate} />
    </>}

    {selectedEvent && <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}><div className="event-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)}><X size={18} /></button><div className="eyebrow">Próximo encontro</div><h2>{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="event-modal-meta"><span><CalendarDays size={17} /> {selectedEvent.date}</span><span><Clock3 size={17} /> {selectedEvent.time}</span><span><Mountain size={17} /> {selectedEvent.place}</span></div><button className="button button-primary" onClick={() => { setMessage('Sua presença foi registrada. Até lá!'); setSelectedEvent(null); }}>Quero participar <ArrowRight size={17} /></button></div></div>}
    {message && <button className="toast" onClick={() => setMessage('')}>{message}<X size={15} /></button>}
  </div>;
}

function HomeView({ onNavigate, onEvent }: { onNavigate: (view: View) => void; onEvent: (event: EventItem) => void }) {
  return <main>
    <section className="hero-section"><div className="hero-image" /><div className="hero-overlay" /><div className="container hero-content"><div className="hero-copy"><div className="eyebrow light">Memórias de Petrópolis</div><h1>A serra que<br /><em>nos une.</em></h1><p>Histórias, pessoas e ações que cuidam de Petrópolis todos os dias.</p><div className="hero-actions"><button className="button button-light" onClick={() => onNavigate('news')}>Conheça nossas histórias <ArrowRight size={17} /></button><button className="text-link light-link" onClick={() => onNavigate('gallery')}>Ver galeria <ChevronRight size={16} /></button></div></div><div className="hero-caption"><span>01</span><i /><span>04</span><p>Serra do Mar<br />Rio de Janeiro</p></div></div></section>
    <section className="intro-section"><div className="container intro-grid"><div><div className="eyebrow">Sobre o SOS Serra</div><h2>Uma rede feita de <em>presença</em>.</h2></div><div className="intro-copy"><p>Somos uma organização comunitária que acredita na força das pessoas e na beleza de cuidar do lugar onde vivemos.</p><button className="text-link" onClick={() => onNavigate('news')}>Conheça nossa história <ArrowRight size={16} /></button></div></div></section>
    <section className="news-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">Do nosso território</div><h2>Últimas histórias</h2></div><button className="text-link" onClick={() => onNavigate('news')}>Ver todas as notícias <ArrowRight size={16} /></button></div><div className="news-grid">{news.map((item, index) => <article className={`news-card ${index === 0 ? 'featured' : ''}`} key={item.title} style={{ backgroundImage: `url(${item.image})` }}><div className="news-card-shade" /><div className="news-card-content"><span>{item.category}</span><h3>{item.title}</h3><div className="card-bottom"><time>{item.date}</time><ArrowRight size={18} /></div></div></article>)}</div></div></section>
    <section className="impact-section"><div className="container impact-grid"><div className="impact-photo" style={{ backgroundImage: `url(${images.sunrise})` }}><div className="impact-badge"><Leaf size={18} /><span>Nosso impacto<br /><strong>em movimento</strong></span></div></div><div className="impact-copy"><div className="eyebrow">Por que fazemos</div><h2>Cuidar é um verbo<br /><em>coletivo.</em></h2><p>Quando uma pessoa se move, a comunidade inteira ganha novos caminhos. É assim que transformamos cuidado em presença, e presença em futuro.</p><div className="impact-numbers"><div><strong>180+</strong><span>famílias alcançadas</span></div><div><strong>24</strong><span>ações em 2026</span></div><div><strong>12</strong><span>bairros parceiros</span></div></div></div></div></section>
    <section className="events-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">Acontece na serra</div><h2>Próximos encontros</h2></div><button className="text-link" onClick={() => onNavigate('events')}>Ver calendário <ArrowRight size={16} /></button></div><div className="event-list">{events.slice(0, 2).map((event) => <button className="event-row" key={event.title} onClick={() => onEvent(event)}><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div className="event-info"><span className="event-tag">{event.time} · {event.place}</span><h3>{event.title}</h3></div><ArrowRight className="event-arrow" size={20} /></button>)}</div></div></section>
    <section className="join-section"><div className="container join-inner"><Sparkles size={22} /><div><div className="eyebrow light">Faça parte</div><h2>Tem uma história para contar?</h2><p>Envie uma mensagem. A serra também é feita da sua voz.</p></div><button className="button button-light" onClick={() => onNavigate('news')}>Fale com a gente <ArrowRight size={17} /></button></div></section>
  </main>;
}

function NewsView({ items, query, setQuery }: { items: NewsItem[]; query: string; setQuery: (value: string) => void }) {
  return <main className="inner-page"><div className="container page-heading"><div className="eyebrow">Jornal SOS Serra</div><h1>Histórias que<br /><em>movem a serra.</em></h1><p>Notícias, memórias e ações de quem faz Petrópolis acontecer.</p></div><div className="container content-toolbar"><div className="toolbar-label"><Newspaper size={18} /> Arquivo de notícias</div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar uma história" /></label></div><div className="container archive-grid">{items.map((item) => <article className="archive-card" key={item.title}><div className="archive-image" style={{ backgroundImage: `url(${item.image})` }} /><div className="archive-copy"><span className="card-category">{item.category}</span><h2>{item.title}</h2><p>{item.excerpt}</p><div className="card-bottom"><time>{item.date}</time><button className="round-arrow"><ArrowRight size={17} /></button></div></div></article>)}{items.length === 0 && <div className="empty-state">Nenhuma história encontrada. Tente outro termo.</div>}</div></main>;
}

function EventsView({ onEvent }: { onEvent: (event: EventItem) => void }) {
  return <main className="inner-page"><div className="container page-heading split-heading"><div><div className="eyebrow">Agenda comunitária</div><h1>Vem com a<br /><em>gente.</em></h1></div><p>Encontros, mutirões e conversas para construir uma serra cada vez mais viva.</p></div><div className="container full-event-list">{events.map((event) => <button className="large-event-card" key={event.title} onClick={() => onEvent(event)}><div className="large-date"><strong>{event.day}</strong><span>{event.month}<br />2026</span></div><div className="large-event-copy"><div className="event-tag">{event.time} · {event.place}</div><h2>{event.title}</h2><p>{event.description}</p></div><span className="circle-arrow"><ArrowRight size={19} /></span></button>)}</div></main>;
}

function GalleryView() {
  return <main className="inner-page"><div className="container page-heading"><div className="eyebrow">Olhares da comunidade</div><h1>A serra em<br /><em>muitos olhares.</em></h1><p>Registros de encontros, paisagens e pequenos gestos que fazem a diferença.</p></div><div className="container gallery-grid">{gallery.map((item, index) => <figure className={`gallery-item gallery-${index + 1}`} key={item.title}><img src={item.image} alt={item.title} /><figcaption><span>0{index + 1}</span>{item.title}</figcaption></figure>)}</div></main>;
}

function AdminView({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState('Notícias');
  return <main className="admin-page"><aside className="admin-sidebar"><Logo dark /><div className="admin-user"><div className="avatar">DR</div><div><strong>Daniel Rufino</strong><span>Administrador</span></div></div><nav>{[['Notícias', Newspaper], ['Eventos', CalendarDays], ['Galeria', GalleryHorizontalEnd], ['Equipe', Users]].map(([label, Icon]) => <button className={active === label ? 'active' : ''} key={String(label)} onClick={() => setActive(String(label))}><Icon size={17} /> {String(label)}</button>)}</nav><button className="back-site" onClick={onBack}><ArrowRight size={16} /> Ver site público</button></aside><section className="admin-content"><div className="admin-top"><div><div className="eyebrow">Painel de controle</div><h1>{active}</h1></div><button className="button button-primary"><Plus size={17} /> Nova publicação</button></div><div className="admin-stats"><div><span>Publicados</span><strong>24</strong><small>+12% este mês</small></div><div><span>Rascunhos</span><strong>03</strong><small>aguardando revisão</small></div><div><span>Visualizações</span><strong>8.4k</strong><small>últimos 30 dias</small></div></div><div className="admin-table"><div className="table-head"><span>Publicação</span><span>Status</span><span>Data</span><span>Ações</span></div>{news.map((item, index) => <div className="table-row" key={item.title}><div className="table-title"><img src={item.image} alt="" /><div><strong>{item.title}</strong><span>{item.category}</span></div></div><span className={`status ${index === 2 ? 'draft' : ''}`}>{index === 2 ? 'Rascunho' : 'Publicado'}</span><time>{item.date}</time><button className="icon-button"><Edit3 size={16} /></button></div>)}</div></section></main>;
}

function Footer({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <footer className="site-footer"><div className="container footer-grid"><div><Logo dark /><p>Histórias, pessoas e ações<br />que cuidam de Petrópolis.</p></div><div className="footer-links"><span>Explorar</span><button onClick={() => onNavigate('news')}>Notícias</button><button onClick={() => onNavigate('events')}>Eventos</button><button onClick={() => onNavigate('gallery')}>Galeria</button></div><div className="footer-links"><span>Fale com a gente</span><a href="mailto:contato@sosserra.org.br"><Mail size={15} /> contato@sosserra.org.br</a><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={17} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={17} /></a><a href="#youtube" aria-label="Youtube"><Youtube size={17} /></a></div></div></div><div className="container footer-bottom"><span>© 2026 SOS Serra. Feito com cuidado em Petrópolis.</span><span>Transparência · Privacidade</span></div></footer>;
}

export default App;
