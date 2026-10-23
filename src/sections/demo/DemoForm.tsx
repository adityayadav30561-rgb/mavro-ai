import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Icon } from '../../components/Icon';
import { demo } from '../../data/home';
import { site } from '../../data/site';
import { DEMO_EVENT, type DemoPrefill } from './prefill';

type Field = 'name' | 'email' | 'phone' | 'company';
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'failed';

interface Values {
  name: string;
  email: string;
  phone: string;
  company: string;
  system: string;
  interests: string[];
  message: string;
  /** Honeypot: people never see or fill this; bots that do are quietly ignored. */
  website: string;
}

const empty: Values = { name: '', email: '', phone: '', company: '', system: '', interests: [], message: '', website: '' };

function validate(v: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) errors.name = demo.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = demo.errors.email;
  if (v.phone.replace(/\D/g, '').length < 8) errors.phone = demo.errors.phone;
  if (v.company.trim().length < 2) errors.company = demo.errors.company;
  return errors;
}

const fill = (text: string, v: Values) =>
  text
    .replace('{name}', v.name.trim().split(/\s+/)[0] || 'there')
    .replace('{email}', v.email.trim())
    .replace('{contact}', site.contactEmail);

function mailtoHref(v: Values) {
  const lines = [
    `Name: ${v.name.trim()}`,
    `Company: ${v.company.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.system && `Runs today: ${v.system}`,
    v.interests.length > 0 && `Interested in: ${v.interests.join(', ')}`,
    v.message.trim() && `\n${v.message.trim()}`,
  ].filter(Boolean);
  const subject = `Demo request: ${v.company.trim()}`;
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * The demo request form. Validates on submit (then live, field by field), posts JSON to site.demoEndpoint when
 * one is configured, and otherwise hands the request to the visitor's email app. Errors are announced and tied
 * to their fields; the result replaces the form and takes focus.
 */
export function DemoForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);

  // Mid-page buttons tick the interest the visitor came from.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { interest } = (event as CustomEvent<DemoPrefill>).detail;
      if (interest) setValues((v) => (v.interests.includes(interest) ? v : { ...v, interests: [...v.interests, interest] }));
      // Focus the first field once the smooth scroll has had time to arrive.
      window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(DEMO_EVENT, onPrefill);
    return () => window.removeEventListener(DEMO_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (status === 'sent' || status === 'mailto') resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (tried) setErrors(validate(next));
      return next;
    });
  };

  const toggleInterest = (interest: string) =>
    set('interests', values.interests.includes(interest) ? values.interests.filter((i) => i !== interest) : [...values.interests, interest]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTried(true);
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      alertRef.current?.focus();
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (values.website) {
      setStatus('sent'); // a bot filled the honeypot: pretend all is well and send nothing
      return;
    }
    if (!site.demoEndpoint) {
      window.location.href = mailtoHref(values);
      setStatus('mailto');
      return;
    }
    setStatus('sending');
    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        system: values.system,
        interests: values.interests,
        message: values.message.trim(),
        source: 'mavro-homepage',
      };
      const response = await fetch(site.demoEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTried(false);
    setStatus('idle');
  };

  if (status === 'sent' || status === 'mailto') {
    const copy = status === 'sent' ? demo.sent : demo.mailto;
    return (
      <div className="demo__card demo__result" role="status">
        <span className="demo__result-icon" aria-hidden="true">
          <Icon name="check" size={28} />
        </span>
        <h3 ref={resultRef} tabIndex={-1}>
          {fill(copy.title, values)}
        </h3>
        <p>{fill(copy.body, values)}</p>
        <button type="button" className="demo__again" onClick={reset}>
          {demo.again}
        </button>
      </div>
    );
  }

  const field = (name: Field, label: string, type: string, autoComplete: string) => {
    const error = errors[name];
    return (
      <div className="demo__field" data-invalid={error ? '' : undefined}>
        <label htmlFor={`${id}-${name}`}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={(e) => set(name, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-${name}-error` : undefined}
          aria-required="true"
        />
        {error && (
          <p id={`${id}-${name}-error`} className="demo__error">
            {error}
          </p>
        )}
      </div>
    );
  };

  const invalid = tried && Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      className="demo__card demo__form"
      noValidate
      onSubmit={onSubmit}
      action={site.demoEndpoint ?? `mailto:${site.contactEmail}`}
      method="post"
      aria-labelledby={`${id}-title`}
    >
      <div className="demo__form-head">
        <h3 id={`${id}-title`}>{demo.form.title}</h3>
        <p>{demo.form.required}</p>
      </div>

      <p ref={alertRef} className="demo__alert" role="alert" tabIndex={-1} hidden={!invalid}>
        {invalid ? demo.form.invalid : ''}
      </p>
      {status === 'failed' && (
        <p className="demo__alert" role="alert">
          {fill(demo.failed, values)}
        </p>
      )}

      <div className="demo__grid">
        {field('name', demo.form.name, 'text', 'name')}
        {field('email', demo.form.email, 'email', 'email')}
        {field('phone', demo.form.phone, 'tel', 'tel')}
        {field('company', demo.form.company, 'text', 'organization')}

        <div className="demo__field demo__field--wide">
          <label htmlFor={`${id}-system`}>{demo.form.system}</label>
          <span className="demo__select">
            <select id={`${id}-system`} name="system" value={values.system} onChange={(e) => set('system', e.target.value)}>
              <option value="">{demo.form.systemPlaceholder}</option>
              {demo.systems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
            <Icon name="chevron" size={16} />
          </span>
        </div>

        <fieldset className="demo__field demo__field--wide demo__chips">
          <legend>{demo.form.interests}</legend>
          <div>
            {demo.interests.map((interest) => {
              const checked = values.interests.includes(interest);
              return (
                <label key={interest} className="demo__chip" data-checked={checked || undefined}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={checked}
                    onChange={() => toggleInterest(interest)}
                  />
                  <Icon name="check" size={14} />
                  {interest}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="demo__field demo__field--wide">
          <label htmlFor={`${id}-message`}>{demo.form.message}</label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            aria-describedby={`${id}-message-hint`}
          />
          <p id={`${id}-message-hint`} className="demo__hint">
            {demo.form.messageHint}
          </p>
        </div>
      </div>

      <div className="demo__honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="demo__actions">
        <button type="submit" className="btn btn--primary demo__submit" disabled={status === 'sending'}>
          {status === 'sending' ? demo.form.sending : demo.form.submit}
          {status !== 'sending' && <Icon name="arrow" size={16} className="btn__arrow" />}
        </button>
        <p className="demo__privacy">{demo.form.privacy}</p>
      </div>
    </form>
  );
}
