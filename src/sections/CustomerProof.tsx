import { SectionHead } from '../blocks/SectionHead';
import { StoryCards } from '../blocks/StoryCards';
import { proof } from '../data/home';
import './customer-proof.css';

/**
 * Customer stories: three anonymised implementations from the product deck (slide 23), as story cards
 * (blocks/StoryCards). A dark band, between the white Why MAVRO and the paper FAQ. Renders nothing if `proof`
 * is ever emptied.
 */
export function CustomerProof() {
  if (proof.logos.length === 0 && proof.stories.length === 0) return null;

  return (
    <section id="stories" className="section section--night proof" aria-labelledby="proof-title">
      <div className="proof__glow" aria-hidden="true" />
      <div className="page">
        <SectionHead id="proof-title" title={proof.title} rest={proof.titleMark} treatment="mark" lead={proof.lead} />
        <StoryCards stories={proof.stories} />
      </div>
    </section>
  );
}
