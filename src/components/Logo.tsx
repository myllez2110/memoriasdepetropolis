import { Mountain } from 'lucide-react';

type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <div className={`brand ${dark ? 'brand-dark' : ''}`}>
      <span className="brand-mark"><Mountain size={21} strokeWidth={2.2} /></span>
      <span><strong>SOS</strong><small>SERRA</small></span>
    </div>
  );
}
