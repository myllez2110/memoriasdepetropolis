import { ArrowRight, ChevronRight, Leaf, Sparkles } from 'lucide-react';
import type { View } from '../types';
import { images, memories, articles } from '../data';

type HomeViewProps = {
  onNavigate: (view: View) => void;
};

export function HomeView({ onNavigate }: HomeViewProps) {
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
              <button className="button button-light" onClick={() => onNavigate('memoria')}>
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
            <button className="text-link" onClick={() => onNavigate('memoria')}>
              Conheça nossa história <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Memorias preview */}
      <section className="news-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Do nosso território</div>
              <h2>Folha da Memória</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('memoria')}>
              Ver todas as memórias <ArrowRight size={16} />
            </button>
          </div>
          <div className="news-grid">
            {memories.map((item, index) => (
              <article
                className={`news-card ${index === 0 ? 'featured' : ''}`}
                key={item.title}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="news-card-shade" />
                <div className="news-card-content">
                  <span>{item.author}</span>
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

      {/* Artigos preview */}
      <section className="news-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Artigos recentes</div>
              <h2>Últimas histórias</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('artigos')}>
              Ver todos os artigos <ArrowRight size={16} />
            </button>
          </div>
          <div className="archive-grid">
            {articles.slice(0, 2).map((item) => (
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
          <button className="button button-light" onClick={() => onNavigate('equipe')}>
            Fale com a gente <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}
