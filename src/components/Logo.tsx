import small from '../assets/brand/logo-480.webp';
import large from '../assets/brand/logo-960.webp';

/*
 * The official MAVRO logo, exactly as supplied (brand/mavro-logo.jpg), with its white background made
 * transparent by scripts/brand.mjs. Never redrawn or recoloured. It is drawn for light surfaces only.
 *
 * The lockup's aspect ratio is 1438 × 268; width follows height so the proportions are never distorted.
 */
const ASPECT = 1438 / 268;

export function Logo({ height = 28, className }: { height?: number; className?: string }) {
  return (
    <img
      className={className ? `logo ${className}` : 'logo'}
      src={small}
      srcSet={`${small} 480w, ${large} 960w`}
      sizes={`${Math.round(height * ASPECT)}px`}
      width={Math.round(height * ASPECT)}
      height={height}
      style={{ height: `${height / 16}rem`, width: 'auto' }}
      alt="MAVRO.AI"
      decoding="async"
    />
  );
}
