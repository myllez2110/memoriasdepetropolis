import { ArrowRight, Newspaper, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { NewsItem } from '../types';
import { articles } from '../data';

export function ArtigosView() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => articles.filter((item) =>
      `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Artigos</div>
        <h1>Textos que<br /><em>movem a serra.</em></h1>
        <p>Notícias, reflexões e ações de quem faz Petrópolis acontecer.</p>
      </div>

      <div className="container content-toolbar">
        <div className="toolbar-label"><Newspaper size={18} /> Arquivo de artigos</div>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar um artigo" />
        </label>
      </div>

      <div className="container archive-grid">
        {filtered.map((item: NewsItem) => (
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
        {filtered.length === 0 && <div className="empty-state">Nenhum artigo encontrado. Tente outro termo.</div>}
      </div>
    </main>
  );
}
