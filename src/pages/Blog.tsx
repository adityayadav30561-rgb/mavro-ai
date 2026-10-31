import { PageHero } from '../blocks/PageHero';
import { Prose } from '../blocks/Prose';
import { sectionClass } from '../blocks/SectionHead';
import { Icon } from '../components/Icon';
import { blogPage, posts } from '../data/company';
import { usePath } from '../routing';
import './company-pages.css';

/**
 * The blog: /blog lists the posts in src/data/company.ts, /blog/<slug> shows one. Routes exist only once there
 * are posts (src/routes.ts), so the Resources menu shows "Blog" only then.
 */
export function Page() {
  const path = usePath();
  const post = posts.find((item) => `/blog/${item.slug}` === path);

  if (post) {
    return (
      <>
        <PageHero variant="simple" title={post.title} lead={post.summary} treatment="soft" />
        <section id="post" className={sectionClass('paper', '')}>
          <div className="page">
          <Prose sections={[{ paragraphs: post.paragraphs }]} updated={post.date} />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero variant="simple" title={blogPage.title} rest={blogPage.rest} lead="" treatment="soft" />
      <section id="posts" className={sectionClass('paper', '')}>
          <div className="page">
        <ul className="cp__list">
          {posts.map((item) => (
            <li key={item.slug}>
              <a href={`/blog/${item.slug}`}>
                <small>{item.date}</small>
                <b>{item.title}</b>
                <span>{item.summary}</span>
                <Icon name="arrow" size={16} />
              </a>
            </li>
          ))}
        </ul>
        </div>
        </section>
    </>
  );
}
