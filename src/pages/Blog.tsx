import { ArticleBody, type ArticleBlock } from '../blocks/ArticleBody';
import { ArticleList } from '../blocks/ArticleList';
import { CtaBand } from '../blocks/CtaBand';
import { DemoLink } from '../blocks/DemoLink';
import { FactCard } from '../blocks/FactCard';
import { FaqBlock } from '../blocks/FaqBlock';
import { ModuleCards } from '../blocks/ModuleCards';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { sectionClass } from '../blocks/SectionHead';
import { SourceList } from '../blocks/SourceList';
import { Toc } from '../blocks/Toc';
import { Icon } from '../components/Icon';
import { blogPage } from '../data/company';
import { explore } from '../data/home';
import { entryBySlug, leadScreens, modulePage, type ModuleSlug } from '../data/modules';
import { longDate, postFor, postIndex, postMeta, postPath, postTypes, type PostBlock } from '../data/posts';
import { usePath } from '../routing';
import { cardFor, iconOf } from './module-card';
import './blog.css';

const entryIcon = (slug: ModuleSlug) => iconOf(entryBySlug(slug));

/** A post's block as the article body renders it: a figure takes the module's lead screen and its own alt text. */
const toArticle = (block: PostBlock): ArticleBlock =>
  block.kind === 'figure'
    ? { kind: 'figure', ...leadScreens[block.module], caption: block.caption, note: explore.sample }
    : block;

/**
 * The blog: /blog lists the articles (src/data/posts/index.ts), /blog/<slug> shows one. An article: the hero with its
 * facts (type, reading time, dates, the page it supports); key takeaways; question-headed sections with tables,
 * charts and module screens beside a sticky contents list; the sources; a visible FAQ; the page that owns the head
 * term; CTA. Routes exist only once there are articles (src/routes.ts).
 */
export function Page() {
  const path = usePath();
  const meta = postMeta(path.replace(/^\/blog\//, ''));

  if (meta && path !== '/blog') {
    const post = postFor(meta.slug);
    const related = meta.page ?? { name: entryBySlug(meta.module).name, href: modulePage(entryBySlug(meta.module)) };
    return (
      <>
        <PageHero
          variant="solution"
          chip={{ label: postTypes[meta.type], icon: 'receipt' }}
          title={meta.title}
          lead={meta.description}
          visual={
            <FactCard
              icon="receipt"
              title={postTypes[meta.type]}
              subtitle={`${meta.minutes} minute read`}
              rows={[
                { icon: 'calendar', label: 'Published', value: longDate(meta.published) },
                { icon: 'check', label: 'Facts checked', value: longDate(meta.checked), note: `${post.sources.length} sources, listed under the article` },
                { icon: entryIcon(meta.module), label: 'The page behind it', value: related.name, href: related.href },
              ]}
            />
          }
        />
        <section id="article" className={`${sectionClass('paper', '')} post`}>
          <div className="page post__grid">
            <div className="post__side">
              <Toc title={blogPage.contents} items={post.sections.map((section) => ({ id: section.id, label: section.heading }))} />
              <div className="post__cta">
                <b>{blogPage.side.title}</b>
                <p>{meta.type === 'informational' ? blogPage.side.info : blogPage.side.sell}</p>
                <DemoLink interest={null} className="btn btn--primary post__btn">
                  {blogPage.side.label}
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </DemoLink>
                <a className="post__more" href={related.href}>
                  {blogPage.side.see} {meta.moduleLink.replace(/\.$/, '')}
                  <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
            <div className="post__main">
              <p className="post__dates">
                Published {longDate(meta.published)} · facts checked {longDate(meta.checked)} · {meta.minutes} minute read
              </p>
              <ArticleBody
                takeawaysTitle={blogPage.takeaways}
                takeaways={post.takeaways}
                sections={post.sections.map((section) => ({ ...section, blocks: section.blocks.map(toArticle) }))}
              />
              <SourceList sources={post.sources} checked={longDate(meta.checked)} title={blogPage.sources} />
            </div>
          </div>
        </section>
        {post.faq.length > 0 && <FaqBlock id="faq" tone="white" title={blogPage.faq.title} rest={blogPage.faq.rest} treatment="mark" items={post.faq} />}
        <Section id="module" tone="paper" title={blogPage.module.title} rest={meta.moduleLink} treatment="grad">
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
            title={`${postIndex.length} articles`}
            subtitle="Sources and checked dates on every one"
            rows={(Object.keys(postTypes) as (keyof typeof postTypes)[]).map((type) => ({
              icon: 'check',
              label: postTypes[type],
              value: `${postIndex.filter((item) => item.type === type).length} articles`,
            }))}
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
              .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title))
              .map((item) => ({
                href: postPath(item),
                title: item.title,
                summary: item.description,
                meta: `${postTypes[item.type]} · ${item.minutes} minute read`,
              }))}
          />
        </div>
      </section>
    </>
  );
}
