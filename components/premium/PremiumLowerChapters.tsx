import type { ReactNode } from "react";

import { PremiumKnowledgeAccordion } from "@/components/premium/PremiumKnowledgeAccordion";

const conciergeHref = "mailto:hello@atlas.study?subject=Atlas%20Concierge";

const conciergeTitle = "A real specialist for your whole journey.";

const knowledgeTools = [
  {
    type: "UK · Country guide",
    title: "The complete UK guide for the 2026 intake.",
    copy: "Everything you actually need to know — from picking your university and budgeting realistically, to your first month in London. Updated for the 2026 intake.",
    meta: "Read guide",
  },
  {
    type: "Visa guide",
    title: "UK student visa: every document, every deadline",
    meta: "8 min read",
  },
  {
    type: "Financial aid",
    title: "10 fully-funded scholarships for international students",
    meta: "6 min read",
  },
  {
    type: "Settlement",
    title: "First 7 days in London: the only checklist you need",
    meta: "5 min read",
  },
  {
    type: "Career",
    title: "Graduate Route visa: which jobs actually count",
    meta: "7 min read",
  },
] as const;

const premiumFaqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes. The whole platform — Matcher, Bazaar, Profile, Community, Events, Career — costs you nothing to use, ever. There's no premium tier. Concierge is a separate paid service for people who want a human specialist, but you don't need it to use the platform.",
  },
  {
    question: "How do you make money?",
    answer:
      "Two ways. First, when you choose to use a partner from our Bazaar — a SIM, a bank, an insurer — that partner pays us a referral fee. We disclose this on every card. Second, Concierge: £1,500 one-time, for full end-to-end service. That's it. We don't take secret kickbacks from universities, and we never mark up partner prices.",
  },
  {
    question: "What about after I land — does the platform stop?",
    answer:
      "No, that's the whole point. The post-arrival layer — jobs, community, events, year-round services — is the bit no one else does. You keep using GGI Atlas for free for as long as you want, through your degree, your first job, your post-study work visa, and beyond.",
  },
  {
    question: "Where are you based, and who runs this?",
    answer:
      "London, UK. We've spent six years working with universities, the British Council, the UK government, and tens of thousands of international students directly. GGI Atlas is the product we always wished existed.",
  },
  {
    question: "What's the catch?",
    answer:
      "Honestly, none — but the model only works if our Bazaar partners are genuinely good. We say no to partners who can't beat what's already available. If a partner stops being good for students, we drop them. That's the discipline. The platform is free because it has to be free for our positioning to be true.",
  },
] as const;

function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="premium-concierge__phone-shell">
      <div className="premium-concierge__phone-island" aria-hidden="true" />
      <div className="premium-concierge__phone-status" aria-hidden="true">
        <span>9:41</span>
        <span>● ◒ ▰</span>
      </div>
      <div className="premium-concierge__phone-screen">{children}</div>
      <div className="premium-concierge__phone-home" aria-hidden="true" />
    </div>
  );
}

export function PremiumConcierge() {
  return (
    <section
      className="premium-concierge"
      data-premium-concierge
      aria-labelledby="premium-concierge-title"
      id="premium-concierge"
    >
      <div className="premium-concierge__sticky" data-premium-concierge-sticky>
        <div
          className="premium-concierge__phone premium-concierge__phone--specialist"
          data-premium-concierge-phone
          aria-label="Atlas Concierge specialist mobile dashboard"
        >
          <PhoneChrome>
            <div className="premium-concierge__mobile-brand">
              <b>GGI Atlas</b>
              <span>Concierge</span>
            </div>
            <div className="premium-concierge__specialist-card">
              <span className="premium-concierge__avatar">PA</span>
              <div>
                <strong>Priya Anand</strong>
                <small>Your specialist · UK &amp; Europe</small>
              </div>
            </div>
            <div className="premium-concierge__availability">
              <span aria-hidden="true" />
              Available · Sep 2026 intake
            </div>
            <div className="premium-concierge__mobile-panel">
              <span>Background</span>
              <p>
                Six years guiding Indian students into UK universities. 340+
                admits across LSE, Imperial, UCL, Edinburgh.
              </p>
            </div>
            <div className="premium-concierge__mobile-grid">
              <div>
                <span>Languages</span>
                <strong>English, Hindi, Punjabi</strong>
              </div>
              <div>
                <span>Hours</span>
                <strong>9am–7pm IST · Mon–Sat</strong>
              </div>
            </div>
            <div className="premium-concierge__mobile-panel">
              <span>Reaches you</span>
              <p>Dashboard inbox · WhatsApp · scheduled video calls</p>
            </div>
          </PhoneChrome>
        </div>

        <div className="premium-concierge__copy">
          <h2 id="premium-concierge-title" aria-label={conciergeTitle}>
            {conciergeTitle.split(" ").map((word, index) => (
              <span
                data-premium-concierge-word
                aria-hidden="true"
                key={`${word}-${index}`}
              >
                {word}
              </span>
            ))}
          </h2>
          <a
            aria-label="Meet Concierge"
            className="premium-concierge__cta"
            href={conciergeHref}
          >
            <span className="premium-concierge__cta-label">
              {"Meet Concierge".split(" ").map((word) => (
                <span data-premium-concierge-cta-word key={word}>
                  {word}
                </span>
              ))}
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div
          className="premium-concierge__phone premium-concierge__phone--journey"
          data-premium-concierge-phone
          aria-label="Atlas Concierge journey mobile dashboard"
        >
          <PhoneChrome>
            <div className="premium-concierge__mobile-brand">
              <b>Your journey</b>
              <span>Concierge</span>
            </div>
            <ol className="premium-concierge__timeline">
              <li className="is-complete">
                <span>01</span>
                <div>
                  <strong>Discovery call</strong>
                  <small>Meet your specialist</small>
                </div>
              </li>
              <li className="is-complete">
                <span>02</span>
                <div>
                  <strong>Kick-off &amp; planning</strong>
                  <small>Build your move</small>
                </div>
              </li>
              <li className="is-active">
                <span>03</span>
                <div>
                  <strong>Applications &amp; offers</strong>
                  <small>Stay on track</small>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Visa &amp; pre-departure</strong>
                  <small>Get ready to leave</small>
                </div>
              </li>
              <li>
                <span>05</span>
                <div>
                  <strong>Landed</strong>
                  <small>Settle into your new life</small>
                </div>
              </li>
            </ol>
            <div className="premium-concierge__mobile-note">
              <b>One specialist. Your whole move.</b>
            </div>
          </PhoneChrome>
        </div>
      </div>
    </section>
  );
}

export function PremiumKnowledgeTools() {
  return (
    <section
      className="premium-knowledge"
      data-premium-knowledge
      aria-labelledby="premium-knowledge-title"
      id="premium-knowledge"
    >
      <div className="premium-knowledge__track" data-premium-knowledge-track>
        <div className="premium-knowledge__sticky">
          <header className="premium-knowledge__header">
            <div>
              <p className="premium-kicker">Free guides &amp; tools</p>
              <span>Articles &amp; guides · Tools · Community</span>
            </div>
            <h2 id="premium-knowledge-title">Knowledge &amp; tools.</h2>
            <p>
              Read up before you sign up. Calculate your budget, check your visa
              odds, compare scholarships — no account, no email gate.
            </p>
          </header>
          <PremiumKnowledgeAccordion items={knowledgeTools} />
        </div>
      </div>
    </section>
  );
}

export function PremiumFaq() {
  return (
    <section
      className="premium-faq"
      data-premium-faq
      aria-labelledby="premium-faq-title"
      id="faq"
    >
      <header data-premium-reveal>
        <p className="premium-kicker">Real questions</p>
        <h2 id="premium-faq-title">The honest answers.</h2>
        <p>
          {
            'Most platforms hide behind "for support, contact us." Here\'s what people actually want to know, answered straight.'
          }
        </p>
      </header>
      <div className="premium-faq__list" data-premium-reveal>
        {premiumFaqs.map((faq, index) => (
          <details key={faq.question}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {faq.question}
              <b aria-hidden="true">+</b>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
