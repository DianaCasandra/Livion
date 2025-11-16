import clsx from 'clsx';
import { ReactNode } from 'react';

interface IconGlyphProps {
  icon: ReactNode;
  size?: number;
  active?: boolean;
  className?: string;
}

export const IconGlyph = ({ icon, size = 22, active = false, className }: IconGlyphProps) => (
  <span
    className={clsx(
      'flex items-center justify-center rounded-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] text-slate-300',
      active && 'text-white'
    )}
    style={{ width: size, height: size }}
  >
    {icon}
  </span>
);
