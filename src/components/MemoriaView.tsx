import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { MemoryItem } from '../types';
import { memories } from '../data';

export function MemoriaView() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => memories.filter((m) =>
      `${m.title} ${m.excerpt} ${m.author}`.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Folha da Memória</div>
        <h1>Histórias que<br /><em>a serra guarda.</em></h1>
        <p>Relatos, lembranças e memórias de quem faz parte da história de Petrópolis.</p>
      </div>

      <div className="container content-toolbar">
        <div className="toolbar-label"><BookOpen size={18} /> Arquivo de memórias</div>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar uma memória" />
        </label>
      </div>

      <div className="container memoria-grid">
        {filtered.map((item: MemoryItem) => (
          <article className="memoria-card" key={item.title}>
            <div className="memoria-image" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="memoria-copy">
              <span className="card-category">{item.author}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
              <div className="card-bottom">
                <time>{item.date}</time>
                <button className="round-arrow"><ArrowRight size={17} /></button>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className="empty-state">Nenhuma memória encontrada. Tente outro termo.</div>}
      </div>
    </main>
  );
}
