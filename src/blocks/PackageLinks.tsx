import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import type { Tier } from './PageHero';
import './package-links.css';

export interface PackageLink {
  tier: Tier;
  name: string;
  blurb: string;
  count: string;
  icon: IconName;
  /** The package page; without one the card shows, unlinked. */
  href: string | null;
}

/**
 * The three packages as cards, each with its module count: how they combine on one platform. On a package page the
 * current package is marked and not linked; on the platform overview all three link.
 */
export function PackageLinks({
  packages,
  current,
  here,
  go = 'See',
  stack,
}: {
  packages: readonly PackageLink[];
  current?: Tier;
  here?: string;
  /** The link text before the package name. */
  go?: string;
  /** One column (beside the plate) instead of three. */
  stack?: boolean;
}) {
  return (
    <ul className="plinks" data-stack={stack || undefined}>
      {packages.map((item, index) => {
        const isHere = item.tier === current;
        const body = (
          <>
            <span className="plinks__icon">
              <Icon name={item.icon} size={22} />
            </span>
            <span className="plinks__name">{item.name}</span>
            <span className="plinks__count num">{item.count}</span>
            <span className="plinks__blurb">{item.blurb}</span>
            {isHere ? (
              <span className="plinks__here">{here}</span>
            ) : (
              item.href && (
                <span className="plinks__go">
                  {go} {item.name}
                  <Icon name="arrow" size={16} />
                </span>
              )
            )}
          </>
        );
        return (
          <li key={item.tier} data-tier={item.tier} data-here={isHere || undefined} data-reveal style={vars({ '--i': index })}>
            {item.href && !isHere ? <a href={item.href}>{body}</a> : <div>{body}</div>}
          </li>
        );
      })}
    </ul>
  );
}
