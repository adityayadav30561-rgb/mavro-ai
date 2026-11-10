import { ArticleList } from '../blocks/ArticleList';
import { CtaBand } from '../blocks/CtaBand';
import { FactCard } from '../blocks/FactCard';
import { ModuleCards } from '../blocks/ModuleCards';
import { PageHero } from '../blocks/PageHero';
import { Prose } from '../blocks/Prose';
import { Section } from '../blocks/Section';
import { sectionClass } from '../blocks/SectionHead';
import { SourceList } from '../blocks/SourceList';
import { blogPage } from '../data/company';
import { longDate, postFor, postIndex, postMeta, postPath } from '../data/posts';
import { entryBySlug, modulePage, type ModuleSlug } from '../data/modules';
import { usePath } from '../routing';
import { cardFor, iconOf } from './module-card';

const entryIcon = (slug: ModuleSlug) => iconOf(entryBySlug(slug));
import './company-pages.css';

/**
 * The blog: /blog lists the articles (src/data/posts/index.ts), /blog/<slug> shows one: its question-shaped
 * sections, "How MAVRO handles this" with the module it supports as a card, its sources and the date its facts were
 * checked. Routes exist only once there are articles (src/routes.ts), so the Resources menu shows "Blog" only then.
 */
export function Page() {
  const path = usePath();
  const meta = postMeta(path.replace(/^\/blog\//, ''));

  if (meta && path !== '/blog') {
    const post = postFor(meta.slug);
    return (
      <>
        <PageHero
          variant="solution"
          title={meta.title}
          lead={meta.description}
          visual={
            <FactCard
              icon="receipt"
              title="Guide"
              subtitle={`Supports ${entryBySlug(meta.module).name}`}
              rows={[
                { icon: 'calendar', label: 'Published', value: longDate(meta.published) },
                { icon: 'check', label: 'Facts checked', value: longDate(meta.checked), note: `${post.sources.length} sources, listed under the guide` },
                { icon: entryIcon(meta.module), label: 'The module behind it', value: entryBySlug(meta.module).name, href: modulePage(entryBySlug(meta.module)) },
              ]}
            />
          }
        />
        <section id="article" className={sectionClass('paper', '')}>
          <div className="page">
            <Prose
              sections={[...post.sections, { heading: blogPage.mavro, paragraphs: post.mavro }]}
              updated={`Published ${longDate(meta.published)} · facts checked ${longDate(meta.checked)}`}
            />
            <SourceList sources={post.sources} checked={longDate(meta.checked)} title={blogPage.sources} />
          </div>
        </section>
        <Section id="module" title={blogPage.module.title} rest={meta.moduleLink} treatment="grad">
          <ModuleCards cards={[cardFor(meta.module)]} more={blogPage.module.more} />
        </Section>
        <CtaBand title={blogPage.cta.title} rest={blogPage.cta.rest} body={blogPage.cta.body} label="Request a demo" interest={null} />
      </>
    );
  }

  return (
    <>
      <PageHero
        variant="solution"
        title={blogPage.title}
        rest={blogPage.rest}
        lead={blogPage.lead}
        visual={
          <FactCard
            icon="receipt"
            title={`${postIndex.length} guides`}
            subtitle="Sources and checked dates on every guide"
            chipsLabel="Topics, with the module behind each"
            chips={[...new Set(postIndex.map((item) => item.module))].map((slug) => ({
              label: entryBySlug(slug).name,
              icon: entryIcon(slug),
              href: modulePage(entryBySlug(slug)),
            }))}
          />
        }
      />
      <section id="posts" className={sectionClass('paper', '')}>
        <div className="page">
          <ArticleList
            items={[...postIndex]
              .sort((a, b) => b.published.localeCompare(a.published))
              .map((item) => ({ href: postPath(item), title: item.title, summary: item.description, meta: longDate(item.published) }))}
          />
        </div>
      </section>
    </>
  );
}
