import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { galleryImages } from 'virtual:galeria-manifest';

export function GalleryView() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  function next(e?: React.SyntheticEvent) {
    e?.stopPropagation();
    setLightboxIndex((i) =>
      i === null ? i : (i + 1) % galleryImages.length
    );
  }

  function prev(e?: React.SyntheticEvent) {
    e?.stopPropagation();
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length
    );
  }

  function close() {
    setLightboxIndex(null);
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Olhares da comunidade</div>
        <h1>A serra em<br /><em>muitos olhares.</em></h1>
        <p>Registros de encontros, paisagens e pequenos gestos que fazem a diferença.</p>
      </div>

      {galleryImages.length === 0 && (
        <div className="container empty-state">
          Nenhuma foto encontrada. Adicione imagens à pasta <code>public/images/galeria</code>.
        </div>
      )}

      <div className="container gallery-grid">
        {galleryImages.map((src, index) => {
          const span = index % 7 === 0 ? 'gallery-large' : '';
          return (
            <button
              className={`gallery-item ${span}`}
              key={src}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Abrir imagem ${index + 1}`}
            >
              <img
                src={src}
                alt={`Foto ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/galeria-placeholder.svg';
                }}
              />
            </button>
          );
        })}
      </div>

      {isOpen && lightboxIndex !== null && (
        <div className="lightbox" onClick={close}>
          <a
            className="lightbox-download"
            href={galleryImages[lightboxIndex]}
            download
            aria-label="Baixar imagem"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={22} />
          </a>
          <button className="lightbox-close" onClick={close} aria-label="Fechar">
            <X size={24} />
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={32} />
          </button>
          <img
            className="lightbox-image"
            src={galleryImages[lightboxIndex]}
            alt={`Foto ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Próxima">
            <ChevronRight size={32} />
          </button>
          <span className="lightbox-counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}
    </main>
  );
}
