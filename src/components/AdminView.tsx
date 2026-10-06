import { useState } from 'react';
import { ArrowRight, CalendarDays, CreditCard as Edit3, GalleryHorizontalEnd, Plus, Newspaper, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { news } from '../data';
import { Logo } from './Logo';

type AdminViewProps = {
  onBack: () => void;
};

const sections: [string, LucideIcon][] = [
  ['Notícias', Newspaper],
  ['Eventos', CalendarDays],
  ['Galeria', GalleryHorizontalEnd],
  ['Equipe', Users],
];

export function AdminView({ onBack }: AdminViewProps) {
  const [active, setActive] = useState('Notícias');

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Logo dark />
        <div className="admin-user">
          <div className="avatar">DR</div>
          <div><strong>Daniel Rufino</strong><span>Administrador</span></div>
        </div>
        <nav>
          {sections.map(([label, Icon]) => (
            <button
              className={active === label ? 'active' : ''}
              key={label}
              onClick={() => setActive(label)}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <button className="back-site" onClick={onBack}>
          <ArrowRight size={16} /> Ver site público
        </button>
      </aside>

      <section className="admin-content">
        <div className="admin-top">
          <div>
            <div className="eyebrow">Painel de controle</div>
            <h1>{active}</h1>
          </div>
          <button className="button button-primary"><Plus size={17} /> Nova publicação</button>
        </div>

        <div className="admin-stats">
          <div><span>Publicados</span><strong>24</strong><small>+12% este mês</small></div>
          <div><span>Rascunhos</span><strong>03</strong><small>aguardando revisão</small></div>
          <div><span>Visualizações</span><strong>8.4k</strong><small>últimos 30 dias</small></div>
        </div>

        <div className="admin-table">
          <div className="table-head">
            <span>Publicação</span><span>Status</span><span>Data</span><span>Ações</span>
          </div>
          {news.map((item, index) => (
            <div className="table-row" key={item.title}>
              <div className="table-title">
                <img src={item.image} alt="" />
                <div><strong>{item.title}</strong><span>{item.category}</span></div>
              </div>
              <span className={`status ${index === 2 ? 'draft' : ''}`}>
                {index === 2 ? 'Rascunho' : 'Publicado'}
              </span>
              <time>{item.date}</time>
              <button className="icon-button"><Edit3 size={16} /></button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
