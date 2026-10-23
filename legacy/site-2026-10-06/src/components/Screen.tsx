/*
 * A product screenshot. The images are captured from the prototype in /prototype by `npm run shots`, at two
 * widths: 1440 (name.webp) and 2880 (name@2x.webp).
 */
const files = import.meta.glob<string>('../assets/screens/*.webp', { eager: true, import: 'default' });

export type ScreenName =
  | 'overview'
  | 'sales-order'
  | 'production'
  | 'procurement'
  | 'quality'
  | 'inventory'
  | 'finance'
  | 'access';

interface ScreenProps {
  name: ScreenName;
  alt: string;
  /** Rendered width hint for the browser's source choice. */
  sizes?: string;
  /** Above the fold: load immediately instead of lazily. */
  eager?: boolean;
  className?: string;
}

export function Screen({ name, alt, sizes = '(max-width: 1240px) 94vw, 1180px', eager, className }: ScreenProps) {
  const small = files[`../assets/screens/${name}.webp`];
  const large = files[`../assets/screens/${name}@2x.webp`];

  return (
    <div className={className ? `screen ${className}` : 'screen'}>
      <img
        src={small}
        srcSet={`${small} 1440w, ${large} 2880w`}
        sizes={sizes}
        width={1440}
        height={960}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
