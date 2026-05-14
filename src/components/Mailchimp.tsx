"use client";

import { mailchimp } from "@/resources";
import { Button, Flex, Heading, Input, Text, Background, Column, Textarea, Checkbox } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

type NewsletterProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
};

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  // Contact form state
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [engagementTypes, setEngagementTypes] = useState<string[]>([]);
  const [availability, setAvailability] = useState('UTC+7 — Available mornings & afternoons (09:00–17:00)');
  const [subscribe, setSubscribe] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');

  const engagementOptions = ['Full-time', 'Contract', 'Freelance', 'Consulting'];

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  const toggleEngagement = (option: string) => {
    setEngagementTypes(prev => prev.includes(option) ? prev.filter(p => p !== option) : [...prev, option]);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError('');

    const payload = {
      name: name || 'Anonymous',
      email: contactEmail || email,
      message,
      engagementTypes,
      availability,
      subscribe,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.ok) {
        setSent(true);
        setName('');
        setContactEmail('');
        setMessage('');
        setEngagementTypes([]);
      } else {
        setSendError(json.error || 'Failed to send message');
      }
    } catch (err: any) {
      setSendError(err?.message || 'Network error');
    } finally {
      setSending(false);
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
      </Text>

      {/* Existing Mailchimp subscribe form (unchanged) */}
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        action={mailchimp.action}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
      >
        <Flex id="mc_embed_signup_scroll" fillWidth maxWidth={24} mobileDirection="column" gap="8">
          <Input
            formNoValidate
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              if (error) {
                handleChange(e);
              } else {
                debouncedHandleChange(e);
              }
            }}
            onBlur={handleBlur}
            errorMessage={error}
          />
          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>
          <div id="mce-responses" className="clearfalse">
            <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
            <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>
          <div className="clear">
            <Flex height="48" vertical="center">
              <Button id="mc-embedded-subscribe" value="Subscribe" size="m" fillWidth>
                Subscribe
              </Button>
            </Flex>
          </div>
        </Flex>
      </form>

      {/* Contact form for direct messages */}
      <form onSubmit={handleContactSubmit} style={{ width: '100%', marginTop: 24 }}>
        <Flex fillWidth maxWidth={24} mobileDirection="column" gap="8">
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Your email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
          <Textarea placeholder="Brief message or scope" value={message} onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)} />

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {engagementOptions.map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Checkbox checked={engagementTypes.includes(opt)} onChange={() => toggleEngagement(opt)} />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <Input placeholder="Availability (timezone/hours)" value={availability} onChange={(e) => setAvailability(e.target.value)} />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Checkbox checked={subscribe} onChange={() => setSubscribe(s => !s)} />
            <span>Subscribe to updates</span>
          </label>

          <div className="clear">
            <Flex height="48" vertical="center">
              <Button type="submit" size="m" fillWidth disabled={sending}>
                {sending ? 'Sending...' : (sent ? 'Sent — Thank you' : 'Contact Me')}
              </Button>
            </Flex>
          </div>

          {sendError && <Text onBackground="danger-strong">{sendError}</Text>}
          {sent && <Text onBackground="neutral-strong">Thanks — your message was received. I'll reply within 48 hours.</Text>}
        </Flex>
      </form>
    </Column>
  );
};
