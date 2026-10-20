import { Mail } from 'lucide-react';
import { team } from '../data';

export function EquipeView() {
  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Nossa equipe</div>
        <h1>Quem faz<br /><em>a memória.</em></h1>
        <p>Pessoas que dedicam seus dias a preservar as histórias de Petrópolis e ao pertencimento dos jovens à cidade.</p>
      </div>

      <div className="container equipe-grid">
        {team.map((member) => (
          <article className="equipe-card" key={member.name}>
            <div className="equipe-photo" style={{ backgroundImage: `url(${member.image})` }} />
            <div className="equipe-info">
              <h2>{member.name}</h2>
              <span className="equipe-role">{member.role}</span>
              <p>{member.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="container equipe-cta">
        <div>
          <div className="eyebrow light">Quer fazer parte?</div>
          <h2>A memória precisa de você.</h2>
          <p>Envie uma mensagem. A história de Petrópolis também é feita da sua voz.</p>
        </div>
        <a className="button button-light" href="mailto:contato@sosserra.org.br">
          <Mail size={17} /> Fale com a gente
        </a>
      </div>
    </main>
  );
}
