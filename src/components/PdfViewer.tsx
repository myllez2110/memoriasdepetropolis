import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader as Loader2,
  Maximize,
  Minimize,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

type PdfViewerProps = {
  pdfUrl: string;
  titulo: string;
  onBack: () => void;
};

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;

export function PdfViewer({ pdfUrl, titulo, onBack }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [fitWidth, setFitWidth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hasTriedLoading, setHasTriedLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<HTMLDivElement[]>([]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  const pagesPerSpread = isMobile ? 1 : 2;

  // Only allow loading indicator on first load, not forever.
  const onDocumentLoadSuccess = useCallback(
    ({ numPages: n }: { numPages: number }) => {
      setNumPages(n);
      setLoading(false);
      setError(false);
      setHasTriedLoading(true);
    },
    []
  );

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
    setHasTriedLoading(true);
  }, []);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const computedScale = (() => {
    if (fitWidth && containerWidth > 0) {
      const pageW = 595;
      const targetW = isMobile
        ? containerWidth - 48
        : (containerWidth - 80) / 2 - 20;
      return Math.min(Math.max(targetW / pageW, MIN_SCALE), MAX_SCALE);
    }
    return scale;
  })();

  const totalPages = numPages;
  const currentSpread = Math.ceil(currentPage / pagesPerSpread);
  const totalSpreads = Math.ceil(totalPages / pagesPerSpread);

  function goToPage(page: number) {
    const clamped = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(clamped);
    pageRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  function nextSpread() {
    goToPage(currentPage + pagesPerSpread);
  }

  function prevSpread() {
    goToPage(currentPage - pagesPerSpread);
  }

  function zoomIn() {
    setFitWidth(false);
    setScale((s) => Math.min(s + 0.2, MAX_SCALE));
  }

  function zoomOut() {
    setFitWidth(false);
    setScale((s) => Math.max(s - 0.2, MIN_SCALE));
  }

  function toggleFit() {
    setFitWidth((f) => !f);
  }

  const leftPage = currentPage;
  const rightPage = isMobile ? null : currentPage + 1;
  const spreadPages = isMobile
    ? [leftPage]
    : [leftPage, rightPage].filter((p) => p !== null && p <= totalPages);

  return (
    <main className="journal-page">
      <header className="journal-header">
        <button className="journal-back" onClick={onBack}>
          <ArrowLeft size={18} />
          Voltar ao arquivo
        </button>

        <div className="journal-title">
          <span>Folha da Memória</span>
          <h1>{titulo}</h1>
        </div>

        <a className="journal-download" href={pdfUrl} download>
          <Download size={17} />
          <span className="journal-download-label">Baixar</span>
        </a>
      </header>

      <div className="journal-stage" ref={containerRef}>
        {/* Show loader only while loading, and never forever or when errored */}
        {loading && !error && !hasTriedLoading && (
          <div className="journal-loading">
            <Loader2 size={32} className="spin" />
            <p>Abrindo a edição...</p>
          </div>
        )}

        {error && (
          <div className="journal-error">
            <X size={32} />
            <h3>Não foi possível abrir esta edição</h3>
            <p>
              O arquivo PDF pode ainda não ter sido publicado. Tente novamente
              mais tarde.
            </p>
          </div>
        )}

        {!loading && !error && totalPages > 0 && (
          <>
            <div className="journal-book">
              {spreadPages.map((pageNum) => (
                <div
                  className="journal-sheet"
                  key={pageNum as number}
                  ref={(el) => {
                    if (el && typeof pageNum === 'number')
                      pageRefs.current[pageNum] = el;
                  }}
                >
                  <div className="journal-page-number">{pageNum}</div>
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading=""
                    error=""
                  >
                    <Page
                      pageNumber={
                        typeof pageNum === 'number' ? pageNum : undefined
                      }
                      scale={computedScale}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="journal-canvas"
                    />
                  </Document>
                </div>
              ))}
            </div>

            {totalSpreads > 1 && (
              <>
                <button
                  className="journal-nav journal-nav-prev"
                  onClick={prevSpread}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  className="journal-nav journal-nav-next"
                  onClick={nextSpread}
                  disabled={currentPage + pagesPerSpread > totalPages}
                  aria-label="Próxima página"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      <footer className="journal-toolbar">
        <div className="toolbar-group">
          <button
            onClick={prevSpread}
            disabled={currentPage === 1}
            aria-label="Anterior"
          >
            <ChevronLeft size={19} />
          </button>
          <span className="toolbar-pager">
            {totalPages === 0 ? '—' : `${currentSpread} / ${totalSpreads}`}
          </span>
          <button
            onClick={nextSpread}
            disabled={
              currentPage + pagesPerSpread > totalPages || totalPages === 0
            }
            aria-label="Próxima"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="toolbar-group">
          <button onClick={zoomOut} aria-label="Diminuir zoom">
            <ZoomOut size={18} />
          </button>
          <span className="toolbar-zoom">
            {fitWidth ? 'Ajustar' : `${Math.round(computedScale * 100)}%`}
          </span>
          <button onClick={zoomIn} aria-label="Aumentar zoom">
            <ZoomIn size={18} />
          </button>
          <button
            onClick={toggleFit}
            className={fitWidth ? 'active' : ''}
            aria-label="Ajustar à largura"
          >
            {fitWidth ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>

        <div className="toolbar-pages">
          <input
            type="range"
            min={1}
            max={totalPages || 1}
            value={currentPage}
            onChange={(e) => goToPage(Number(e.target.value))}
            disabled={totalPages === 0}
          />
        </div>
      </footer>
    </main>
  );
}
