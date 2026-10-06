import { ArrowRight, ChevronRight, Leaf, Sparkles } from 'lucide-react';
import type { EventItem, View } from '../types';
import { images, news, events } from '../data';

type HomeViewProps = {
  onNavigate: (view: View) => void;
  onEvent: (event: EventItem) => void;
};

export function HomeView({ onNavigate, onEvent }: HomeViewProps) {
  return (
    <main>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow light">Memórias de Petrópolis</div>
            <h1>A serra que<br /><em>nos une.</em></h1>
            <p>Histórias, pessoas e ações que cuidam de Petrópolis todos os dias.</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => onNavigate('news')}>
                Conheça nossas histórias <ArrowRight size={17} />
              </button>
              <button className="text-link light-link" onClick={() => onNavigate('gallery')}>
                Ver galeria <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="hero-caption">
            <span>01</span><i /><span>04</span>
            <p>Serra do Mar<br />Rio de Janeiro</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="intro-section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">Sobre o SOS Serra</div>
            <h2>Uma rede feita de <em>presença</em>.</h2>
          </div>
          <div className="intro-copy">
            <p>Somos uma organização comunitária que acredita na força das pessoas e na beleza de cuidar do lugar onde vivemos.</p>
            <button className="text-link" onClick={() => onNavigate('news')}>
              Conheça nossa história <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="news-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Do nosso território</div>
              <h2>Últimas histórias</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('news')}>
              Ver todas as notícias <ArrowRight size={16} />
            </button>
          </div>
          <div className="news-grid">
            {news.map((item, index) => (
              <article
                className={`news-card ${index === 0 ? 'featured' : ''}`}
                key={item.title}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="news-card-shade" />
                <div className="news-card-content">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <div className="card-bottom">
                    <time>{item.date}</time>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="impact-section">
        <div className="container impact-grid">
          <div className="impact-photo" style={{ backgroundImage: `url(${images.sunrise})` }}>
            <div className="impact-badge">
              <Leaf size={18} />
              <span>Nosso impacto<br /><strong>em movimento</strong></span>
            </div>
          </div>
          <div className="impact-copy">
            <div className="eyebrow">Por que fazemos</div>
            <h2>Cuidar é um verbo<br /><em>coletivo.</em></h2>
            <p>Quando uma pessoa se move, a comunidade inteira ganha novos caminhos. É assim que transformamos cuidado em presença, e presença em futuro.</p>
            <div className="impact-numbers">
              <div><strong>180+</strong><span>famílias alcançadas</span></div>
              <div><strong>24</strong><span>ações em 2026</span></div>
              <div><strong>12</strong><span>bairros parceiros</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="events-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Acontece na serra</div>
              <h2>Próximos encontros</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('events')}>
              Ver calendário <ArrowRight size={16} />
            </button>
          </div>
          <div className="event-list">
            {events.slice(0, 2).map((event) => (
              <button className="event-row" key={event.title} onClick={() => onEvent(event)}>
                <div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div>
                <div className="event-info">
                  <span className="event-tag">{event.time} · {event.place}</span>
                  <h3>{event.title}</h3>
                </div>
                <ArrowRight className="event-arrow" size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="join-section">
        <div className="container join-inner">
          <Sparkles size={22} />
          <div>
            <div className="eyebrow light">Faça parte</div>
            <h2>Tem uma história para contar?</h2>
            <p>Envie uma mensagem. A serra também é feita da sua voz.</p>
          </div>
          <button className="button button-light" onClick={() => onNavigate('news')}>
            Fale com a gente <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}
