type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <div className={`brand${dark ? ' brand-dark' : ''}`}>
      <span className="brand-mark">
        <img src="/images/logo.png" alt="Logo" />
      </span>
      <span className="brand-name">
        MEMÓRIAS DE PETRÓPOLIS
      </span>
    </div>
  );
}