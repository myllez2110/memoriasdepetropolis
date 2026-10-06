import { ArrowRight, Newspaper, Search } from 'lucide-react';
import type { NewsItem } from '../types';

type NewsViewProps = {
  items: NewsItem[];
  query: string;
  setQuery: (value: string) => void;
};

export function NewsView({ items, query, setQuery }: NewsViewProps) {
  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Jornal SOS Serra</div>
        <h1>Histórias que<br /><em>movem a serra.</em></h1>
        <p>Notícias, memórias e ações de quem faz Petrópolis acontecer.</p>
      </div>

      <div className="container content-toolbar">
        <div className="toolbar-label"><Newspaper size={18} /> Arquivo de notícias</div>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar uma história" />
        </label>
      </div>

      <div className="container archive-grid">
        {items.map((item) => (
          <article className="archive-card" key={item.title}>
            <div className="archive-image" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="archive-copy">
              <span className="card-category">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
              <div className="card-bottom">
                <time>{item.date}</time>
                <button className="round-arrow"><ArrowRight size={17} /></button>
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 && <div className="empty-state">Nenhuma história encontrada. Tente outro termo.</div>}
      </div>
    </main>
  );
}
