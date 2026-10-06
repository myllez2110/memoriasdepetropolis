import { gallery } from '../data';

export function GalleryView() {
  return (
    <main className="inner-page">
      <div className="container page-heading">
        <div className="eyebrow">Olhares da comunidade</div>
        <h1>A serra em<br /><em>muitos olhares.</em></h1>
        <p>Registros de encontros, paisagens e pequenos gestos que fazem a diferença.</p>
      </div>

      <div className="container gallery-grid">
        {gallery.map((item, index) => (
          <figure className={`gallery-item gallery-${index + 1}`} key={item.title}>
            <img src={item.image} alt={item.title} />
            <figcaption><span>0{index + 1}</span>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
