import React from "react";
import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="site-header">
      <a className="brand" href={baseUrl} aria-label="Meshwary home">
        <img
          className="brand-logo"
          src={`${baseUrl}assets/meshwary-logo.png`}
          alt="Meshwary"
        />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`header-nav${isMenuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a className="nav-link" href="#about">
          About Meshwary
        </a>
        <a className="get-link button button-primary" href="#get-meshwary">
          Get Meshwary
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const words = useMemo(() => ["Cost", "Way", "Route", "Fuel"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const activeWord = words[wordIndex];
    const isComplete = !isDeleting && letterCount === activeWord.length;
    const isEmpty = isDeleting && letterCount === 0;
    const delay = isComplete ? 1200 : isEmpty ? 260 : isDeleting ? 70 : 110;

    const timeoutId = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        setIsDeleting(false);
        return;
      }

      setLetterCount((currentCount) =>
        currentCount + (isDeleting ? -1 : 1),
      );
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, letterCount, wordIndex, words]);

  const typedWord = words[wordIndex].slice(0, letterCount);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url("${baseUrl}assets/hero-road.png")` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          Your Trip, Your{" "}
          <span className="hero-title-accent">
            {typedWord}
            <span className="hero-cursor" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-copy">
          No more worries about fuel costs, just open the app, find the
          shortest route, and save more on every trip.
        </p>
      </div>
    </section>
  );
}

function Services() {
  const baseUrl = import.meta.env.BASE_URL;
  const services = [
    {
      title: "Budget your fuel before you move.",
      buttonLabel: "Get the app",
      variant: "dark",
      image: "service-app-phones.png",
      imageAlt: "Meshwary mobile app screens",
    },
    {
      title: "Daily fuel updates. Best routes. Always.",
      buttonLabel: "Get started",
      variant: "photo",
      image: "service-fuel.jpg",
      imageAlt: "Fuel station pump nozzles",
    },
    {
      title: "Tell Meshwary where to go, it handles the rest.",
      buttonLabel: "Download app",
      variant: "light",
      image: "service-assistant-phone.png",
      imageAlt: "Meshwary assistant on a phone",
    },
    {
      title: "Plan your trip, know your spend.",
      buttonLabel: "Learn more",
      variant: "photo",
      image: "service-road.jpg",
      imageAlt: "A car driving on a coastal mountain road",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="section-kicker">MESHWARY app</div>
      <h2 className="section-title">Our Services</h2>

      <div className="services-grid">
        {services.map((service) => (
          <article
            className={`service-card service-card-${service.variant}`}
            key={service.title}
          >
            <div className="service-card-copy">
              <h3>{service.title}</h3>
              <a className="button button-primary service-button" href="#get-meshwary">
                {service.buttonLabel}
              </a>
            </div>

            <img
              className="service-card-image"
              src={`${baseUrl}assets/${service.image}`}
              alt={service.imageAlt}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyMeshwary() {
  const baseUrl = import.meta.env.BASE_URL;
  const features = [
    {
      title: "Instant Fuel Cost Estimation",
      copy: "Meshwary calculates your expected fuel expense. Plan and budget with confidence.",
      image: "why-fuel-cost.png",
      imageAlt: "Green car with a speedometer",
    },
    {
      title: "AI-Powered Route Optimization",
      copy: "Saving you time, distance, and money on every trip.",
      image: "why-route-optimization.png",
      imageAlt: "Route map on a phone with a green car",
    },
    {
      title: "Your Personal AI Driving Assistant",
      copy: "From route suggestions to fuel savings tips, and get instant, intelligent answers on the go.",
      image: "why-ai-assistant.png",
      imageAlt: "Chat assistant helping a driver",
    },
    {
      title: "Real-Time Fuel Price Tracking",
      copy: "Stay updated with daily fuel prices no surprises, no overspending.",
      image: "why-fuel-tracking.png",
      imageAlt: "Hybrid car at an electric fuel station",
    },
  ];

  return (
    <section className="why" id="about">
      <div className="section-kicker section-kicker-green">MESHWARY vision</div>
      <h2 className="section-title why-title">Why Meshwary?</h2>

      <div className="why-grid">
        {features.map((feature) => (
          <article className="why-card" key={feature.title}>
            <div className="why-card-copy">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
            <img
              className="why-card-image"
              src={`${baseUrl}assets/${feature.image}`}
              alt={feature.imageAlt}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function FuelPrices() {
  const baseUrl = import.meta.env.BASE_URL;
  const prices = [
    {
      name: "Gasoline 92",
      price: "22.25",
      note: "Most common fuel for everyday vehicles",
    },
    {
      name: "Gasoline 95",
      price: "24.00",
    },
    {
      name: "Gasoline 80",
      price: "20.75",
    },
    {
      name: "Diesel Engine",
      price: "20.50",
    },
  ];

  return (
    <section
      className="fuel-prices"
      style={{
        backgroundImage: `url("${baseUrl}assets/fuel-prices-bg.jpg")`,
      }}
    >
      <div className="fuel-prices-content">
        <h2>Today's Fuel Prices, Always Up to Date!</h2>
        <p>
          Stay informed before every drive. Meshwary tracks the latest fuel
          prices daily so you can plan smarter, budget better, and never get
          caught off guard at the pump.
        </p>

        <div className="fuel-price-grid" aria-label="Latest fuel prices">
          {prices.map((fuel) => (
            <article className="fuel-price-card" key={fuel.name}>
              <img
                className="fuel-card-logo"
                src={`${baseUrl}assets/fuel-card-logo.png`}
                alt=""
                aria-hidden="true"
              />
              <h3>
                {fuel.name}
                <span className="fuel-trend" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <div className="fuel-price-value">
                <span>{fuel.price}</span>
                <small>EGP/L</small>
              </div>
              {fuel.note ? <p className="fuel-price-note">ⓘ {fuel.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="about-cta" id="get-meshwary">
      <div className="about-cta-content">
        <p className="about-eyebrow">About MESHWARY</p>
        <h2>MESHWARY, the app that thinks before you drive.</h2>
        <p className="about-copy">
          Say goodbye to fuel surprises. Meshwary calculates your expected
          costs, finds the shortest route, and helps you save on every single
          journey.
        </p>
        <a className="download-button" href="#get-meshwary">
          Download now
        </a>
      </div>

      <img
        className="about-phone"
        src={`${baseUrl}assets/about-phone.png`}
        alt="Meshwary app home screen on a phone"
      />
    </section>
  );
}

function FinalCta() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <footer className="final-cta">
      <div className="final-cta-panel">
        <div className="final-cta-copy">
          <h2>Plan. Route. Save.</h2>
          <p>
            Take control of your journey before you even leave the driveway.
            Meshwary turns every drive into a smarter, cheaper experience.
          </p>
          <div className="final-cta-actions" aria-label="Meshwary actions">
            <a className="final-pill" href="#get-meshwary">
              <span aria-hidden="true">👀</span>
              Download App
            </a>
            <a className="final-pill" href="mailto:hello@meshwary.app">
              <span aria-hidden="true">👋</span>
              Contact Us
            </a>
          </div>
        </div>

        <div className="final-footer-row">
          <img
            className="final-logo"
            src={`${baseUrl}assets/final-cta-image.png`}
            alt="Meshwary"
          />

          <p className="final-copyright">
            © 2026 Meshwary. All Rights Reserved.
          </p>

          <div className="final-socials" aria-label="Social links">
            <a
              className="final-social-link"
              href="https://github.com/"
              aria-label="Meshwary on GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.04A9.37 9.37 0 0 1 12 6.98c.85 0 1.69.12 2.49.34 1.9-1.32 2.74-1.04 2.74-1.04.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.95.68 1.91v2.81c0 .27.18.6.69.49A10.16 10.16 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a
              className="final-social-link final-social-link-text"
              href="https://www.linkedin.com/"
              aria-label="Meshwary on LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <Hero />
        <Services />
        <WhyMeshwary />
        <FuelPrices />
        <AboutCta />
      </main>
      <FinalCta />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
