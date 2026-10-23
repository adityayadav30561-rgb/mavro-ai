import type { ModuleSlug } from '../data/modules/slugs';

/*
 * A product screenshot. The images are captured from the prototype in /prototype by `npm run shots`:
 *
 *   desktop  1440 × 960 at two widths, 1440 (name.webp) and 2880 (name@2x.webp)
 *   phone    390 × 844 at two widths, 780 (name.webp) and 1170 (name@2x.webp)
 *
 * Homepage screens sit in src/assets/screens/; module screens in src/assets/screens/<slug>/ and are named
 * '<slug>/<file>' (prototype/modules/<slug>/<file>.html).
 */
const files = import.meta.glob<string>('../assets/screens/**/*.webp', { eager: true, import: 'default' });

const sizes = {
  desktop: { width: 1440, height: 960, small: 1440, large: 2880 },
  phone: { width: 390, height: 844, small: 780, large: 1170 },
};

export type ScreenName =
  | `${ModuleSlug}/${string}`
  | 'overview'
  | 'sales-order'
  | 'production'
  | 'procurement'
  | 'quality'
  | 'inventory'
  | 'finance'
  | 'access'
  | 'o2c'
  | 'accounting'
  | 'payroll'
  | 'purchase-order'
  | 'work-order'
  | 'stock-item'
  | 'project';

interface ScreenProps {
  name: ScreenName;
  alt: string;
  /** Rendered width hint for the browser's source choice. */
  sizes?: string;
  /** Above the fold: load immediately instead of lazily. */
  eager?: boolean;
  className?: string;
  /** A phone screen (prototype/phone.css): its own size and aspect. */
  device?: 'desktop' | 'phone';
}

export function Screen({
  name,
  alt,
  sizes: hint = '(max-width: 1240px) 94vw, 1180px',
  eager,
  className,
  device = 'desktop',
}: ScreenProps) {
  const small = files[`../assets/screens/${name}.webp`];
  const large = files[`../assets/screens/${name}@2x.webp`];
  if (!small) throw new Error(`Screen: no capture for "${name}" (run npm run shots ${name})`);
  const size = sizes[device];
  const image = (
    <img
      src={small}
      srcSet={large ? `${small} ${size.small}w, ${large} ${size.large}w` : undefined}
      sizes={hint}
      width={size.width}
      height={size.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  // A phone screen sits in a drawn device: rim, bezel, the glass with its Dynamic Island, and the side buttons.
  if (device === 'phone') {
    return (
      <div className={className ? `screen phone ${className}` : 'screen phone'} data-device="phone">
        <span className="phone__btn" data-btn="action" aria-hidden="true" />
        <span className="phone__btn" data-btn="up" aria-hidden="true" />
        <span className="phone__btn" data-btn="down" aria-hidden="true" />
        <span className="phone__btn" data-btn="power" aria-hidden="true" />
        <span className="phone__glass">
          {image}
          <span className="phone__island" aria-hidden="true" />
        </span>
      </div>
    );
  }

  return <div className={className ? `screen ${className}` : 'screen'}>{image}</div>;
}
