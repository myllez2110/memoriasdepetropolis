import { ArrowRight, BookOpen, ChevronRight, GraduationCap, MapPin, Newspaper, PenLine, Sparkles } from 'lucide-react';
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
            <div className="eyebrow light">Associação SOS Serra</div>
            <h1>Memórias de<br /><em>Petrópolis.</em></h1>
            <p>Um projeto que desperta na juventude o interesse pelas histórias da cidade e o pertencimento ao lugar onde vivem.</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => onNavigate('memoria')}>
                Folha da Memória <ArrowRight size={17} />
              </button>
              <button className="text-link light-link" onClick={() => onNavigate('gallery')}>
                Ver galeria <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="hero-caption">
            <span>01</span><i /><span>04</span>
            <p>Petrópolis<br />Rio de Janeiro</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="intro-section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">O projeto</div>
            <h2>Um convite para <em>pertencer.</em></h2>
          </div>
          <div className="intro-copy">
            <p>Nascido em setembro de 2023, o Memórias de Petrópolis nasceu de uma queixa ouvida com recorrência entre os alunos: a sensação de que os bairros da cidade pouco tinham memória, como se o passado estivesse restrito aos casarões do Centro Histórico.</p>
            <p>Desde então, oficinas semanais e gratuitas descentralizam as narrativas sobre a história da cidade, levando os jovens a descobrir que cada bairro guarda histórias vivas — inclusive as que eles mesmos começam a construir.</p>
            <button className="text-link" onClick={() => onNavigate('equipe')}>
              Conheça a equipe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Sobre / nova sede */}
      <section className="impact-section">
        <div className="container impact-grid">
          <div className="impact-photo" style={{ backgroundImage: `url(${images.sunrise})` }}>
            <div className="impact-badge">
              <MapPin size={18} />
              <span>Nova sede desde<br /><strong>março de 2026</strong></span>
            </div>
          </div>
          <div className="impact-copy">
            <div className="eyebrow">Onde estamos</div>
            <h2>Uma casa que<br /><em>cresceu.</em></h2>
            <p>Após três anos na Escola Germano Valente, o projeto ganhou casa nova no prédio do CEFET, na Rua do Imperador. Hoje, integram o Memórias de Petrópolis estudantes de quatro escolas municipais: Germano Valente, Professora Maria Campos, Clemente Fernandes e Dr. Rubens de Castro Bomtempo.</p>
            <div className="impact-numbers">
              <div><strong>4</strong><span>escolas parceiras</span></div>
              <div><strong>2023</strong><span>ano de fundação</span></div>
              <div><strong>2</strong><span>turmas ativas</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="news-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">O que fazemos</div>
              <h2>Muito além da sala de aula.</h2>
            </div>
          </div>
          <div className="pilhas-grid">
            <article className="pilha-card">
              <div className="pilha-icon"><GraduationCap size={24} /></div>
              <h3>Oficinas semanais</h3>
              <p>Aulas dinâmicas pautadas por fotografias, conteúdos audiovisuais e gincanas que tornam o aprendizado mais estimulante.</p>
            </article>
            <article className="pilha-card">
              <div className="pilha-icon"><MapPin size={24} /></div>
              <h3>Aulas de campo</h3>
              <p>Saídas recorrentes em que os alunos se apropriam de espaços e histórias da cidade, com acompanhamento da guia Raquel Neves.</p>
            </article>
            <article className="pilha-card">
              <div className="pilha-icon"><PenLine size={24} /></div>
              <h3>Laboratórios de escrita</h3>
              <p>Com a transferência para o CEFET, os alunos passaram a ter acesso a laboratórios de escrita e informática para uma formação integrada.</p>
            </article>
            <article className="pilha-card">
              <div className="pilha-icon"><Sparkles size={24} /></div>
              <h3>Guardiões da Memória</h3>
              <p>Programa de bonificação que convida os alunos de destaque de cada mês a viver experiências culturais como reconhecimento por sua dedicação.</p>
            </article>
            <article className="pilha-card">
              <div className="pilha-icon"><Newspaper size={24} /></div>
              <h3>Folha da Memória</h3>
              <p>Jornal coordenado pela professora Carolina Freitas e escrito pelos próprios alunos com base nos conteúdos aprendidos a cada ciclo.</p>
            </article>
            <article className="pilha-card">
              <div className="pilha-icon"><BookOpen size={24} /></div>
              <h3>Pertencimento</h3>
              <p>A partir do contato com lugares, personagens e histórias do território, encorajamos os alunos a conhecerem e zelarem pelo patrimônio da cidade.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Folha da Memória preview */}
      <section className="news-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Do nosso território</div>
              <h2>Folha da Memória</h2>
            </div>
            <button className="text-link" onClick={() => onNavigate('memoria')}>
              Ver todas as edições <ArrowRight size={16} />
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
            <p>A serra também é feita da sua voz. Envie uma mensagem e participe.</p>
          </div>
          <button className="button button-light" onClick={() => onNavigate('equipe')}>
            Fale com a gente <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}
