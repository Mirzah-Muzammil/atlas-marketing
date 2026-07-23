import Image from "next/image";

export function PremiumProductShowcase() {
  return (
    <section
      id="premium-product"
      className="premium-product premium-tutorial"
      data-premium-product-showcase
      aria-labelledby="premium-product-title"
    >
      <header className="premium-tutorial__header" data-premium-reveal>
        <div>
          <p className="premium-kicker">The actual product</p>
          <span>Atlas / A three-minute walkthrough</span>
        </div>
        <h2 id="premium-product-title">
          One Atlas. <span>Every part of the move.</span>
        </h2>
        <p>
          See the route before you take it. Three screens, three decisions, and
          one clear next step at a time.
        </p>
      </header>

      <div className="premium-tutorial__scroll">
        <div className="premium-tutorial__sticky">
          <div
            className="premium-tutorial__copy-rail"
            data-premium-tutorial-copy-rail
            data-premium-tutorial-copy-position="top"
          >
            <div className="premium-tutorial__copy" data-premium-tutorial-copy>
              <span>Step 01 / Plan &amp; Apply</span>
              <h3>Build your move.</h3>
              <p>
                Add your target university and intake. Atlas turns the whole
                application into a live sequence, then keeps the next task in
                view.
              </p>
              <ol>
                <li><b>01</b> Check your application progress.</li>
                <li><b>02</b> Open the next deadline.</li>
                <li><b>03</b> Keep documents and visa work together.</li>
              </ol>
            </div>

            <div className="premium-tutorial__copy" data-premium-tutorial-copy>
              <span>Step 02 / Arrive &amp; Settle</span>
              <h3>Sort the landing.</h3>
              <p>
                Open Bazaar, compare the essentials, and activate what you need
                in the right order—before the flight or after you land.
              </p>
              <ol>
                <li><b>01</b> Choose a service.</li>
                <li><b>02</b> Compare the real terms.</li>
                <li><b>03</b> Activate it from the same workspace.</li>
              </ol>
            </div>

            <div className="premium-tutorial__copy" data-premium-tutorial-copy>
              <span>Step 03 / Build &amp; Thrive</span>
              <h3>Keep building.</h3>
              <p>
                Switch to Careers when you are ready. Filter for student-friendly
                roles, see sponsorship signals, and move from browsing to an
                application.
              </p>
              <ol>
                <li><b>01</b> Filter the live job board.</li>
                <li><b>02</b> Check sponsorship status.</li>
                <li><b>03</b> Apply with the right support.</li>
              </ol>
            </div>
          </div>

          <div className="premium-tutorial__deck" data-premium-tutorial-deck>
            <article
              className="premium-tutorial__step"
              data-premium-tutorial-step
              data-premium-tutorial-card
              aria-label="Plan and apply product view"
            >
              <div
                className="premium-tutorial__visual"
                data-premium-tutorial-screen
              >
                <figure className="premium-tutorial__screen premium-tutorial__screen--command">
                  <Image
                    src="/images/crm.png"
                    alt="Atlas application command centre tutorial"
                    width={1144}
                    height={575}
                    sizes="(min-width: 900px) 48vw, 70vw"
                  />
                </figure>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--progress"
                  data-premium-tutorial-callout
                >
                  <b>01</b>
                  <em>Your progress</em>
                </span>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--next"
                  data-premium-tutorial-callout
                >
                  <b>02</b>
                  <em>What&apos;s next</em>
                </span>
              </div>
            </article>

            <article
              className="premium-tutorial__step"
              data-premium-tutorial-step
              data-premium-tutorial-card
              aria-label="Arrive and settle product view"
            >
              <div
                className="premium-tutorial__visual premium-tutorial__visual--arrival"
                data-premium-tutorial-screen
              >
                <figure className="premium-tutorial__screen premium-tutorial__screen--bazaar">
                  <Image
                    src="/images/feature-1.png"
                    alt="Atlas pre-arrival services tutorial"
                    width={658}
                    height={657}
                    sizes="(min-width: 900px) 42vw, 70vw"
                  />
                </figure>
                <figure className="premium-tutorial__screen premium-tutorial__screen--mobile">
                  <Image
                    src="/images/hand.png"
                    alt="Atlas mobile eSIM activation tutorial"
                    width={360}
                    height={500}
                    sizes="(min-width: 900px) 14vw, 28vw"
                  />
                </figure>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--services"
                  data-premium-tutorial-callout
                >
                  <b>01</b>
                  <em>Pick an essential</em>
                </span>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--activate"
                  data-premium-tutorial-callout
                >
                  <b>02</b>
                  <em>Activate it</em>
                </span>
              </div>
            </article>

            <article
              className="premium-tutorial__step"
              data-premium-tutorial-step
              data-premium-tutorial-card
              aria-label="Build and thrive product view"
            >
              <div
                className="premium-tutorial__visual"
                data-premium-tutorial-screen
              >
                <figure className="premium-tutorial__screen premium-tutorial__screen--careers">
                  <Image
                    src="/images/feature-2.png"
                    alt="Atlas careers dashboard tutorial"
                    width={658}
                    height={657}
                    sizes="(min-width: 900px) 42vw, 70vw"
                  />
                </figure>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--filter"
                  data-premium-tutorial-callout
                >
                  <b>01</b>
                  <em>Find the right role</em>
                </span>
                <span
                  className="premium-tutorial__callout premium-tutorial__callout--sponsor"
                  data-premium-tutorial-callout
                >
                  <b>02</b>
                  <em>Check sponsorship</em>
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
