import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';

import { edicoes } from '../data';

export function MemoriaView() {
  const [pdfSelecionado, setPdfSelecionado] = useState<string | null>(null);
  const [tituloPdf, setTituloPdf] = useState('');

  const edicoesPorAno = useMemo(() => {
    const grupos: Record<number, typeof edicoes> = {};

    edicoes.forEach((edicao) => {
      if (!grupos[edicao.ano]) {
        grupos[edicao.ano] = [];
      }

      grupos[edicao.ano].push(edicao);
    });

    return Object.entries(grupos).sort(
      ([anoA], [anoB]) => Number(anoB) - Number(anoA)
    );
  }, []);

  function abrirPdf(pdf: string, mes: string, ano: number) {
    setPdfSelecionado(pdf);
    setTituloPdf(`${mes} ${ano}`);
  }

  function fecharPdf() {
    setPdfSelecionado(null);
    setTituloPdf('');
  }

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

        <span>{edicoes.length} edições</span>
      </div>

      <div className="container arquivo">
        {edicoesPorAno.map(([ano, lista]) => (
          <section className="ano" key={ano}>
            <div className="ano-title">
              <span>Arquivo</span>
              <h2>{ano}</h2>
            </div>

            <div className="edicoes">
              {lista.map((edicao) => (
                <button
                  className="edicao"
                  key={`${edicao.mes}-${edicao.ano}`}
                  onClick={() =>
                    abrirPdf(edicao.pdf, edicao.mes, edicao.ano)
                  }
                >
                  <div className="edicao-icon">
                    <FileText size={22} />
                  </div>

                  <div className="edicao-text">
                    <span>Edição</span>
                    <h3>{edicao.mes}</h3>
                    <time>{edicao.ano}</time>
                  </div>

                  <ArrowRight className="edicao-arrow" size={20} />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}