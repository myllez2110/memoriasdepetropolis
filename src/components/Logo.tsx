type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <div className={`brand ${dark ? 'brand-dark' : ''}`}>
      <span className="brand-mark">
        <img src="/images/ChatGPT_Image_6_de_out._de_2026,_13_37_33.png" alt="" />
      </span>
      <span className="brand-name">Memórias de Petrópolis</span>
    </div>
  );
}
