import { ArrowLeft, ArrowRight, FileText, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

import { edicoes, mesesOrdem } from '../data';
import type { Edicao } from '../data';

type TurmaFiltro = 'todas' | 'A' | 'B';

export function MemoriaView() {
  const [pdfSelecionado, setPdfSelecionado] = useState<string | null>(null);
  const [tituloPdf, setTituloPdf] = useState('');
  const [turmaFiltro, setTurmaFiltro] = useState<TurmaFiltro>('todas');
  const [anoFiltro, setAnoFiltro] = useState<number | 'todos'>('todos');
  const [mesFiltro, setMesFiltro] = useState<string>('todos');

  const anosDisponiveis = useMemo(
    () => Array.from(new Set(edicoes.map((e) => e.ano))).sort((a, b) => b - a),
    []
  );

  const edicoesFiltradas = useMemo(() => {
    return edicoes.filter((e) => {
      if (turmaFiltro !== 'todas' && e.turma !== turmaFiltro) return false;
      if (anoFiltro !== 'todos' && e.ano !== anoFiltro) return false;
      if (mesFiltro !== 'todos' && e.mes !== mesFiltro) return false;
      return true;
    });
  }, [turmaFiltro, anoFiltro, mesFiltro]);

  const edicoesPorAno = useMemo(() => {
    const grupos: Record<number, Edicao[]> = {};
    edicoesFiltradas.forEach((edicao) => {
      if (!grupos[edicao.ano]) grupos[edicao.ano] = [];
      grupos[edicao.ano].push(edicao);
    });
    Object.values(grupos).forEach((lista) => {
      lista.sort((a, b) => mesesOrdem.indexOf(b.mes) - mesesOrdem.indexOf(a.mes));
    });
    return Object.entries(grupos).sort(([a], [b]) => Number(b) - Number(a));
  }, [edicoesFiltradas]);

  function abrirPdf(pdf: string, mes: string, ano: number, turma: string) {
    setPdfSelecionado(pdf);
    setTituloPdf(`${mes} ${ano} · Turma ${turma}`);
  }

  function fecharPdf() {
    setPdfSelecionado(null);
    setTituloPdf('');
  }

  function limparFiltros() {
    setTurmaFiltro('todas');
    setAnoFiltro('todos');
    setMesFiltro('todos');
  }

  const temFiltroAtivo =
    turmaFiltro !== 'todas' || anoFiltro !== 'todos' || mesFiltro !== 'todos';

  if (pdfSelecionado) {
    return (
      <main className="pdf-page">
        <header className="pdf-header">
          <button className="pdf-back" onClick={fecharPdf}>
            <ArrowLeft size={18} />
            Voltar ao arquivo
          </button>

          <div className="pdf-heading">
            <span>Folha da Memória</span>
            <h1>{tituloPdf}</h1>
          </div>
        </header>

        <section className="pdf-viewer">
          <iframe
            src={`${pdfSelecionado}#toolbar=1&navpanes=0`}
            title={tituloPdf}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Folha da Memória</div>

        <h1>
          Arquivo das
          <br />
          <em>edições.</em>
        </h1>

        <p>
          Consulte as edições da Folha da Memória e conheça as histórias
          preservadas.
        </p>
      </div>

      <div className="container arquivo-header">
        <div className="arquivo-label">
          <FileText size={18} />
          Arquivo digital
        </div>

        <span>{edicoesFiltradas.length} edições</span>
      </div>

      <div className="container filtros-bar">
        <div className="filtro-grupo">
          <Filter size={16} />
          <span className="filtro-titulo">Filtrar por:</span>
        </div>

        <div className="filtro-grupo">
          <label className="filtro-label">Turma</label>
          <div className="filtro-pills">
            <button
              className={turmaFiltro === 'todas' ? 'active' : ''}
              onClick={() => setTurmaFiltro('todas')}
            >
              Todas
            </button>
            <button
              className={turmaFiltro === 'A' ? 'active' : ''}
              onClick={() => setTurmaFiltro('A')}
            >
              Turma A
            </button>
            <button
              className={turmaFiltro === 'B' ? 'active' : ''}
              onClick={() => setTurmaFiltro('B')}
            >
              Turma B
            </button>
          </div>
        </div>

        <div className="filtro-grupo">
          <label className="filtro-label">Ano</label>
          <select
            className="filtro-select"
            value={anoFiltro}
            onChange={(e) =>
              setAnoFiltro(e.target.value === 'todos' ? 'todos' : Number(e.target.value))
            }
          >
            <option value="todos">Todos os anos</option>
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label className="filtro-label">Mês</label>
          <select
            className="filtro-select"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
          >
            <option value="todos">Todos os meses</option>
            {mesesOrdem
              .filter((m) => edicoes.some((e) => e.mes === m))
              .map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
          </select>
        </div>

        {temFiltroAtivo && (
          <button className="filtro-limpar" onClick={limparFiltros}>
            Limpar filtros
          </button>
        )}
      </div>

      <div className="container arquivo">
        {edicoesPorAno.length === 0 && (
          <div className="empty-state">
            Nenhuma edição encontrada com os filtros selecionados.
          </div>
        )}

        {edicoesPorAno.map(([ano, lista]) => {
          const turmaA = lista.filter((e) => e.turma === 'A');
          const turmaB = lista.filter((e) => e.turma === 'B');
          const mostrarColunaA = turmaFiltro !== 'B' && turmaA.length > 0;
          const mostrarColunaB = turmaFiltro !== 'A' && turmaB.length > 0;

          return (
            <section className="ano" key={ano}>
              <div className="ano-title">
                <span>Arquivo</span>
                <h2>{ano}</h2>
              </div>

              <div className="turmas-grid">
                {mostrarColunaA && (
                  <div className="turma-coluna">
                    <div className="turma-cabecalho turma-a">
                      <span>Turma A</span>
                      <small>{turmaA.length} edição{turmaA.length !== 1 ? 'ões' : ''}</small>
                    </div>
                    <div className="edicoes">
                      {turmaA.map((edicao) => (
                        <button
                          className="edicao"
                          key={`${edicao.mes}-${edicao.ano}-${edicao.turma}`}
                          onClick={() => abrirPdf(edicao.pdf, edicao.mes, edicao.ano, edicao.turma)}
                        >
                          <div className="edicao-icon">
                            <FileText size={22} />
                          </div>
                          <div className="edicao-text">
                            <span>Edição · Turma {edicao.turma}</span>
                            <h3>{edicao.mes}</h3>
                            <time>{edicao.ano}</time>
                          </div>
                          <ArrowRight className="edicao-arrow" size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mostrarColunaB && (
                  <div className="turma-coluna">
                    <div className="turma-cabecalho turma-b">
                      <span>Turma B</span>
                      <small>{turmaB.length} edição{turmaB.length !== 1 ? 'ões' : ''}</small>
                    </div>
                    <div className="edicoes">
                      {turmaB.map((edicao) => (
                        <button
                          className="edicao"
                          key={`${edicao.mes}-${edicao.ano}-${edicao.turma}`}
                          onClick={() => abrirPdf(edicao.pdf, edicao.mes, edicao.ano, edicao.turma)}
                        >
                          <div className="edicao-icon">
                            <FileText size={22} />
                          </div>
                          <div className="edicao-text">
                            <span>Edição · Turma {edicao.turma}</span>
                            <h3>{edicao.mes}</h3>
                            <time>{edicao.ano}</time>
                          </div>
                          <ArrowRight className="edicao-arrow" size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
