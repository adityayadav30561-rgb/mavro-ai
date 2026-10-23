import { Icon } from '../components/Icon';
import { workflow } from '../data/home';
import { vars } from '../motion/hooks';
import './workflow.css';

/*
 * One order to cash, as seven steps owned by seven modules, all writing to one record. The heading is centred
 * over the symmetric row of steps, in one colour (the page's other headline treatments vary around it).
 */
export function Workflow() {
  const steps = workflow.steps;

  return (
    <section id="workflow" className="section section--paper flow" aria-labelledby="flow-title">
      <div className="page">
        <header className="head head--center flow__head" data-reveal>
          <h2 id="flow-title" className="h2">
            {workflow.title} {workflow.titleSoft}
          </h2>
          <p className="lead">{workflow.lead}</p>
        </header>

        <div className="flow__board" data-reveal>
          <p className="flow__caption num">{workflow.caption}</p>

          <ol className="flow__steps" style={vars({ '--n': steps.length })}>
            {steps.map((step, index) => (
              <li key={step.title} className="flow__step" style={vars({ '--i': index })}>
                <span className="flow__index num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flow__module">
                  <Icon name={step.icon} size={18} />
                  {step.module}
                </span>
                <h3 className="flow__title">{step.title}</h3>
                <p className="flow__body">{step.body}</p>
                <span className="flow__doc num">{step.doc}</span>
              </li>
            ))}
          </ol>

          <div className="flow__record">
            <span className="flow__record-mark" aria-hidden="true" />
            <p>
              <b>One shared record.</b> Every step reads from and writes to the same order, so sales, stores, the
              plant, quality, transport and finance see the same facts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
