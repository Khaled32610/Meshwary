import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const FUEL_PRICES_ENDPOINT =
  "https://meshwary-backend.vercel.app/api/v1/fuel-prices";

const TRIP_COST_ENDPOINT =
  "https://meshwary-backend.vercel.app/api/v1/trip-cost/";

const CHAT_ENDPOINT = import.meta.env.DEV
  ? "/chat"
  : "https://meshwary-chatbot-production.up.railway.app/chat";

function Header({ page = "home", onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;
  const homePath = baseUrl;
  const tripCostPath = `${baseUrl}#/trip-cost`;
  const assistantPath = `${baseUrl}#/assistant`;

  function handleNavigate(event, route) {
    if (!onNavigate) {
      return;
    }

    event.preventDefault();
    onNavigate(route);
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a
        className="brand"
        href={baseUrl}
        aria-label="Meshwary home"
        onClick={(event) => handleNavigate(event, "")}
      >
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
        {page === "trip-cost" ? (
          <>
            <a
              className="nav-link"
              href={homePath}
              onClick={(event) => handleNavigate(event, "")}
            >
              Home
            </a>
            <a className="nav-link" href="#fuel-prices">
              Fuel Prices
            </a>
            <a
              className="get-link button button-primary"
              href={homePath}
              onClick={(event) => handleNavigate(event, "")}
            >
              Back Home
            </a>
          </>
        ) : (
          <>
            <a className="nav-link" href="#about">
              About Meshwary
            </a>
            <a
              className="nav-link"
              href={tripCostPath}
              onClick={(event) => handleNavigate(event, "trip-cost")}
            >
              Trip Cost
            </a>
            <a
              className="nav-link"
              href={assistantPath}
              onClick={(event) => handleNavigate(event, "assistant")}
            >
              AI Assistant
            </a>
            <a className="get-link button button-primary" href="#get-meshwary">
              Get Meshwary
            </a>
          </>
        )}
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
  const [fuelPrices, setFuelPrices] = useState(null);
  const [fuelPricesStatus, setFuelPricesStatus] = useState("loading");

  const fuels = [
    {
      name: "Gasoline 92",
      field: "benzine92",
      note: "Most common fuel for everyday vehicles",
    },
    {
      name: "Gasoline 80",
      field: "benzine80",
    },
    {
      name: "Gasoline 95",
      field: "benzine95",
    },
    {
      name: "Diesel Engine",
      field: "solar",
    },
  ];

  useEffect(() => {
    const controller = new AbortController();

    async function loadFuelPrices() {
      try {
        setFuelPricesStatus("loading");

        const response = await fetch(FUEL_PRICES_ENDPOINT, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load fuel prices");
        }

        const payload = await response.json();
        setFuelPrices(payload.fuelPrices ?? payload.data ?? payload);
        setFuelPricesStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setFuelPricesStatus("error");
      }
    }

    loadFuelPrices();

    return () => controller.abort();
  }, []);

  const formatFuelPrice = (price) => {
    if (typeof price !== "number") {
      return "—";
    }

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

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

        {fuelPricesStatus === "error" ? (
          <p className="fuel-price-status" role="status">
            Fuel prices are temporarily unavailable.
          </p>
        ) : null}

        <div
          className="fuel-price-grid"
          aria-busy={fuelPricesStatus === "loading"}
          aria-label="Latest fuel prices"
        >
          {fuels.map((fuel) => (
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
                <span>{formatFuelPrice(fuelPrices?.[fuel.field])}</span>
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

function FinalCta({ page = "home" }) {
  const baseUrl = import.meta.env.BASE_URL;
  const primaryHref = page === "trip-cost" ? baseUrl : "#get-meshwary";
  const primaryLabel = page === "trip-cost" ? "Back Home" : "Download App";

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
            <a className="final-pill" href={primaryHref}>
              <span aria-hidden="true">👀</span>
              {primaryLabel}
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

const defaultTripForm = {
  brand: "Toyota",
  model: "Corolla",
  year: String(new Date().getFullYear()),
  from_location: "Cairo",
  to_location: "Alexandria",
  fuelType: "92",
  roadType: "city",
  temperature: "38",
  airConditioning: true,
};

const tripFuelOptions = [
  {
    label: "Gasoline 80",
    value: "80",
    field: "benzine80",
    note: "Budget-friendly daily driving",
  },
  {
    label: "Gasoline 92",
    value: "92",
    field: "benzine92",
    note: "Balanced for most cars",
  },
  {
    label: "Gasoline 95",
    value: "95",
    field: "benzine95",
    note: "Higher-performance engines",
  },
  {
    label: "Diesel",
    value: "diesel",
    field: "solar",
    note: "For diesel-powered vehicles",
  },
];

const tripRoadTypes = [
  {
    label: "Highway",
    value: "highway",
    description: "Smoother, faster, more efficient",
  },
  {
    label: "City",
    value: "city",
    description: "Traffic-aware urban driving",
  },
];

const routeSamples = [
  {
    route: "Cairo -> Alexandria",
    distance: "225 km",
    estimate: "338-417 EGP est.",
  },
  {
    route: "Cairo -> Hurghada",
    distance: "450 km",
    estimate: "675-834 EGP est.",
  },
  {
    route: "Cairo -> Luxor",
    distance: "670 km",
    estimate: "1,005-1,243 EGP est.",
  },
];

function TripCostHero() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section
      className="trip-hero"
      style={{ backgroundImage: `url("${baseUrl}assets/hero-road.png")` }}
    >
      <div className="trip-hero-scrim" />
      <div className="trip-hero-content">
        <div className="trip-hero-kicker">Cost Estimation</div>
        <h1>
          Calculate Your <span>Trip Cost</span>
        </h1>
        <p>
          Enter your trip details and get an accurate fuel cost estimate before
          you hit the road.
        </p>
      </div>
    </section>
  );
}

function parseTripRecommendations(recommendations) {
  if (typeof recommendations !== "string") {
    return [];
  }

  return recommendations
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-•\u2022]\s*/, ""));
}

function formatTripNumber(value, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatTripCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function TripFuelChip({ option, value, selected, onSelect }) {
  return (
    <button
      className={`trip-fuel-chip${selected ? " is-selected" : ""}`}
      type="button"
      onClick={() => onSelect(option.value)}
      aria-pressed={selected}
    >
      <span className="trip-fuel-chip-label">{option.label}</span>
      <span className="trip-fuel-chip-price">
        {typeof value === "number" ? `${formatTripCurrency(value)} EGP/L` : "Loading..."}
      </span>
      <span className="trip-fuel-chip-note">{option.note}</span>
    </button>
  );
}

function TripCostPage({ onNavigate }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [form, setForm] = useState(defaultTripForm);
  const [stops, setStops] = useState([""]);
  const [fuelPrices, setFuelPrices] = useState(null);
  const [fuelPricesStatus, setFuelPricesStatus] = useState("loading");
  const [status, setStatus] = useState("idle");
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState(null);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, index) => String(currentYear - index));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFuelPrices() {
      try {
        setFuelPricesStatus("loading");

        const response = await fetch(FUEL_PRICES_ENDPOINT, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load fuel prices");
        }

        const payload = await response.json();
        setFuelPrices(payload.fuelPrices ?? payload.data ?? payload);
        setFuelPricesStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setFuelPricesStatus("error");
      }
    }

    loadFuelPrices();

    document.title = "Meshwary | Trip Cost Estimator";

    return () => controller.abort();
  }, []);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateStop(index, value) {
    setStops((current) =>
      current.map((stop, currentIndex) => (currentIndex === index ? value : stop)),
    );
  }

  function addStop() {
    setStops((current) => [...current, ""]);
  }

  function removeStop(index) {
    setStops((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function getFuelPriceForOption(option) {
    const price = fuelPrices?.[option.field];
    return typeof price === "number" ? price : null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setApiError("");
    setResult(null);

    try {
      const payload = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        from_location: form.from_location.trim(),
        to_location: form.to_location.trim(),
        fuelType: form.fuelType,
        roadType: form.roadType,
        temperature: Number(form.temperature),
        airConditioning: form.airConditioning,
      };

      const response = await fetch(TRIP_COST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        const apiMessage = data?.message || "Unable to calculate the trip cost.";
        const validationErrors = Array.isArray(data?.details?.detail)
          ? data.details.detail.map((item) => item?.msg).filter(Boolean)
          : [];
        throw new Error(
          validationErrors.length > 0
            ? `${apiMessage} ${validationErrors.join(" ")}`
            : apiMessage,
        );
      }

      setResult(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setApiError(error.message || "Something went wrong.");
    }
  }

  const recommendationItems = parseTripRecommendations(result?.recommendations);

  return (
    <>
      <Header page="trip-cost" onNavigate={onNavigate} />
      <main className="trip-page">
        <TripCostHero />
        <section className="trip-estimator" id="trip-cost">
          <div className="trip-grid">
            <form className="trip-form" onSubmit={handleSubmit}>
              <div className="trip-panel-title">
                <span className="trip-panel-icon" aria-hidden="true">
                  ➊
                </span>
                <div>
                  <h2>Trip Details</h2>
                  <p>Tell Meshwary where you are going and what you are driving.</p>
                </div>
              </div>

              <div className="trip-field-grid">
                <label className="trip-field-card">
                  <span>From</span>
                  <input
                    type="text"
                    value={form.from_location}
                    onChange={(event) => updateField("from_location", event.target.value)}
                    placeholder="Cairo Festival City"
                  />
                </label>

                <label className="trip-field-card">
                  <span>To</span>
                  <input
                    type="text"
                    value={form.to_location}
                    onChange={(event) => updateField("to_location", event.target.value)}
                    placeholder="Alexandria"
                  />
                </label>

                <label className="trip-field-card">
                  <span>Brand</span>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(event) => updateField("brand", event.target.value)}
                    placeholder="Toyota"
                  />
                </label>

                <label className="trip-field-card">
                  <span>Model</span>
                  <input
                    type="text"
                    value={form.model}
                    onChange={(event) => updateField("model", event.target.value)}
                    placeholder="Corolla"
                  />
                </label>

                <label className="trip-field-card">
                  <span>Year</span>
                  <select
                    value={form.year}
                    onChange={(event) => updateField("year", event.target.value)}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="trip-field-card">
                  <span>Temperature</span>
                  <input
                    type="number"
                    value={form.temperature}
                    onChange={(event) => updateField("temperature", event.target.value)}
                    min="-20"
                    max="60"
                    step="1"
                  />
                </label>
              </div>

              <div className="trip-stop-stack">
                <div className="trip-stop-stack-header">
                  <span className="trip-stop-marker" aria-hidden="true">
                    ⊙
                  </span>
                  <span>Route Stops</span>
                </div>

                {stops.map((stop, index) => (
                  <div className="trip-stop-row" key={`trip-stop-${index}`}>
                    <label className="trip-field-card trip-stop-field">
                      <span>{index === 0 ? "Stop" : `Stop ${index + 1}`}</span>
                      <input
                        type="text"
                        value={stop}
                        onChange={(event) => updateStop(index, event.target.value)}
                        placeholder="Add a stop or leave empty"
                      />
                    </label>

                    {stops.length > 1 ? (
                      <button
                        className="trip-stop-remove"
                        type="button"
                        onClick={() => removeStop(index)}
                        aria-label={`Remove stop ${index + 1}`}
                      >
                        ×
                      </button>
                    ) : null}
                  </div>
                ))}

                <button className="trip-stop-add" type="button" onClick={addStop}>
                  Add Stop
                </button>
              </div>

              <label className="trip-toggle-card" htmlFor="air-conditioning">
                <div>
                  <span className="trip-toggle-title">A/C (Air Conditioning)</span>
                  <span className="trip-toggle-copy">
                    Keeps the trip comfortable and factors into the estimate.
                  </span>
                </div>
                <input
                  id="air-conditioning"
                  type="checkbox"
                  checked={form.airConditioning}
                  onChange={(event) => updateField("airConditioning", event.target.checked)}
                />
              </label>

              <div className="trip-segment-group">
                <div className="trip-segment-label">Road Type</div>
                <div className="trip-segments">
                  {tripRoadTypes.map((roadType) => (
                    <button
                      key={roadType.value}
                      className={`trip-segment-button${
                        form.roadType === roadType.value ? " is-selected" : ""
                      }`}
                      type="button"
                      onClick={() => updateField("roadType", roadType.value)}
                    >
                      <span>{roadType.label}</span>
                      <small>{roadType.description}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="trip-fuel-group" id="fuel-prices">
                <div className="trip-segment-label">Fuel Type</div>
                <div className="trip-fuel-grid">
                  {tripFuelOptions.map((option) => (
                    <TripFuelChip
                      key={option.value}
                      option={option}
                      value={getFuelPriceForOption(option)}
                      selected={form.fuelType === option.value}
                      onSelect={(value) => updateField("fuelType", value)}
                    />
                  ))}
                </div>

                {fuelPricesStatus === "error" ? (
                  <p className="trip-inline-status" role="status">
                    Current fuel prices are unavailable.
                  </p>
                ) : null}
              </div>

              {apiError ? (
                <p className="trip-error-banner" role="alert">
                  {apiError}
                </p>
              ) : null}

              <button className="trip-calculate-button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Calculating..." : "Calculate Trip Cost"}
              </button>

              <p className="trip-form-footnote">
                The API currently uses your start and destination locations for the cost
                calculation. Extra stops are kept in the interface for planning.
              </p>
            </form>

            <aside className="trip-preview-panel" aria-live="polite">
              <div
                className={`trip-preview-hero${result ? " has-result" : ""}`}
                style={{ backgroundImage: `url("${baseUrl}assets/hero-road.png")` }}
              >
                <div className="trip-preview-scrim" />
                <div className="trip-preview-hero-copy">
                  <h2>{result ? "Trip cost ready" : "Ready to Estimate"}</h2>
                  <p>
                    {result
                      ? `${form.from_location} to ${form.to_location} with a ${form.brand} ${form.model}.`
                      : "Fill in your trip details on the left, then hit Calculate."}
                  </p>
                </div>
              </div>

              <div className="trip-preview-body">
                {result ? (
                  <>
                    <div className="trip-result-summary">
                      <div className="trip-summary-card">
                        <span>Consumption Rate</span>
                        <strong>{formatTripNumber(result.consumptionRate)}</strong>
                        <small>L / 100 km est.</small>
                      </div>

                      <div className="trip-summary-card">
                        <span>Fuel Price</span>
                        <strong>{formatTripCurrency(result.fuelPrice)}</strong>
                        <small>EGP/L</small>
                      </div>

                      <div className="trip-summary-card">
                        <span>Estimated Cost</span>
                        <strong>{formatTripCurrency(result.estimatedCost)}</strong>
                        <small>EGP</small>
                      </div>
                    </div>

                    <div className="trip-recommendations">
                      <div className="trip-recommendations-title">AI Recommendations</div>
                      {recommendationItems.length > 0 ? (
                        <ul>
                          {recommendationItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No recommendations returned for this trip.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="trip-route-list-label">Popular Routes</div>
                    <div className="trip-route-list">
                      {routeSamples.map((route) => (
                        <article className="trip-route-item" key={route.route}>
                          <div>
                            <h3>{route.route}</h3>
                            <p>{route.distance}</p>
                          </div>
                          <strong>{route.estimate}</strong>
                        </article>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <FinalCta page="trip-cost" />
    </>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <Header page="home" onNavigate={onNavigate} />
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

const assistantSuggestions = [
  "What are the current fuel prices in Egypt?",
  "How much does it cost to drive Cairo to Luxor?",
  "What is the cheapest fuel type for long trips?",
  "Tips to save fuel on the highway?",
];

const assistantRecentChats = [
  {
    title: "Cairo -> Alexandria trip",
    copy: "Estimated cost is 338 EGP with gasoline 92.",
    time: "2h ago",
  },
  {
    title: "Fuel price comparison",
    copy: "Diesel is the cheapest option at 20.50 EGP/L.",
    time: "Yesterday",
  },
  {
    title: "Hurghada road trip plan",
    copy: "The fastest route is via the Ain Sokhna road.",
    time: "Jun 17",
  },
];

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function splitWords(chunk) {
  return chunk.match(/\S+/g) ?? [];
}

function AssistantHeader({ onNavigate }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="assistant-topbar">
      <div className="assistant-brand">
        <img
          className="assistant-brand-logo"
          src={`${baseUrl}assets/meshwary-logo.png`}
          alt="Meshwary"
        />
        <div>
          <strong>Meshwary AI</strong>
          <span>Fuel & trip assistant</span>
        </div>
      </div>

      <div className="assistant-topbar-copy">
        <strong>Meshwary AI Assistant</strong>
        <span>
          <i className="assistant-status-dot" aria-hidden="true" />
          Online - ready to help
        </span>
      </div>

      <a
        className="assistant-topbar-link"
        href={`${baseUrl}#/trip-cost`}
        onClick={(event) => {
          if (!onNavigate) {
            return;
          }

          event.preventDefault();
          onNavigate("trip-cost");
        }}
      >
        Trip Cost
      </a>
    </header>
  );
}

function AssistantSidebar({ onStartNewChat }) {
  return (
    <aside className="assistant-sidebar">
      <button className="assistant-new-chat" type="button" onClick={onStartNewChat}>
        + New Conversation
      </button>

      <div className="assistant-sidebar-section">
        <span className="assistant-sidebar-label">Recent Chats</span>
        <div className="assistant-recent-list">
          {assistantRecentChats.map((chat) => (
            <article className="assistant-recent-item" key={chat.title}>
              <div className="assistant-recent-icon" aria-hidden="true">
                <span />
              </div>
              <div>
                <h3>{chat.title}</h3>
                <p>{chat.copy}</p>
                <small>{chat.time}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}

function AssistantComposer({ value, onChange, onSubmit, onPickPrompt, disabled }) {
  return (
    <div className="assistant-composer">
      <div className="assistant-quick-prompts">
        {assistantSuggestions.map((prompt) => (
          <button
            className="assistant-prompt-card"
            type="button"
            key={prompt}
            onClick={() => onPickPrompt(prompt)}
          >
            <span className="assistant-prompt-icon" aria-hidden="true">
              ⌁
            </span>
            <span>{prompt}</span>
            <span className="assistant-prompt-arrow" aria-hidden="true">
              ›
            </span>
          </button>
        ))}
      </div>

      <form className="assistant-input-bar" onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask about fuel prices, trip costs, routes..."
          disabled={disabled}
        />
        <button type="submit" disabled={disabled || !value.trim()}>
          Send
        </button>
      </form>

      <p className="assistant-disclaimer">
        Meshwary AI provides estimates based on official Egyptian fuel prices. Always verify before your trip.
      </p>
    </div>
  );
}

function AssistantPage({ onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef(null);
  const assistantMessageIdRef = useRef(null);
  const queueRef = useRef([]);
  const streamDoneRef = useRef(false);
  const drainTimerRef = useRef(null);
  const [queueTick, setQueueTick] = useState(0);

  useEffect(() => {
    document.title = "Meshwary | AI Assistant";
  }, []);

  useEffect(() => {
    if (!assistantMessageIdRef.current) {
      return undefined;
    }

    if (drainTimerRef.current) {
      return undefined;
    }

    drainTimerRef.current = window.setInterval(() => {
      const nextWord = queueRef.current.shift();

      if (nextWord) {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageIdRef.current
              ? {
                  ...message,
                  content: message.content
                    ? `${message.content} ${nextWord}`
                    : nextWord,
                }
              : message,
          ),
        );
        return;
      }

      if (streamDoneRef.current) {
        window.clearInterval(drainTimerRef.current);
        drainTimerRef.current = null;
        assistantMessageIdRef.current = null;
        streamDoneRef.current = false;
        setIsSending(false);
      }
    }, 45);

    return () => {
      if (drainTimerRef.current) {
        window.clearInterval(drainTimerRef.current);
        drainTimerRef.current = null;
      }
    };
  }, [queueTick]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, queueTick]);

  useEffect(() => {
    return () => {
      if (drainTimerRef.current) {
        window.clearInterval(drainTimerRef.current);
      }
    };
  }, []);

  function pushWords(words) {
    if (!words.length) {
      return;
    }

    queueRef.current.push(...words);
    setQueueTick((current) => current + 1);
  }

  function resetConversation() {
    queueRef.current = [];
    streamDoneRef.current = false;
    assistantMessageIdRef.current = null;
    setMessages([]);
    setInputValue("");
    setErrorMessage("");
    setIsSending(false);
  }

  async function sendMessage(prompt) {
    const messageText = prompt.trim();
    if (!messageText || isSending) {
      return;
    }

    setErrorMessage("");
    setIsSending(true);

    const userMessage = { id: makeId(), role: "user", content: messageText };
    const assistantMessage = { id: makeId(), role: "assistant", content: "" };
    assistantMessageIdRef.current = assistantMessage.id;
    queueRef.current = [];
    streamDoneRef.current = false;

    const history = messages
      .filter((message) => message.content.trim().length > 0)
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    setMessages((currentMessages) => [...currentMessages, userMessage, assistantMessage]);
    setInputValue("");

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: messageText,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to reach the chat service.");
      }

      const data = await response.json();
      const assistantText = data?.response?.trim();

      if (!assistantText) {
        throw new Error("The assistant returned an empty response.");
      }

      pushWords(splitWords(assistantText));
      streamDoneRef.current = true;
      setQueueTick((current) => current + 1);
    } catch (error) {
      streamDoneRef.current = false;
      queueRef.current = [];
      assistantMessageIdRef.current = null;
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: "Sorry, I could not reach the chat service right now.",
              }
            : message,
        ),
      );
      setErrorMessage(error.message || "Unable to reach the chat service.");
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(inputValue);
  }

  function handlePickPrompt(prompt) {
    setInputValue(prompt);
    sendMessage(prompt);
  }

  return (
    <section className="assistant-page">
      <div className="assistant-shell">
        <AssistantSidebar onStartNewChat={resetConversation} />

        <div className="assistant-main">
          <AssistantHeader onNavigate={onNavigate} />

          <div className="assistant-chat">
            {messages.length === 0 ? (
              <div className="assistant-empty-state">
                <img
                  className="assistant-empty-logo"
                  src={`${import.meta.env.BASE_URL}assets/meshwary-logo.png`}
                  alt=""
                  aria-hidden="true"
                />
                <h1>How can I help you today?</h1>
                <p>
                  Ask about fuel prices, trip costs, route efficiency, or driving
                  tips across Egypt.
                </p>
              </div>
            ) : null}

            <div className="assistant-messages">
              {messages.map((message) => (
                <article
                  className={`assistant-message assistant-message-${message.role}`}
                  key={message.id}
                >
                  <span className="assistant-message-badge">
                    {message.role === "user" ? "You" : "Meshwary AI"}
                  </span>
                  <p>
                    {message.content}
                    {message.role === "assistant" &&
                    message.id === assistantMessageIdRef.current &&
                    isSending ? (
                      <span className="assistant-cursor" aria-hidden="true" />
                    ) : null}
                  </p>
                </article>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {errorMessage ? (
              <p className="assistant-error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <AssistantComposer
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onPickPrompt={handlePickPrompt}
              disabled={isSending}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const getRoute = () =>
    window.location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function navigate(nextRoute) {
    const nextHash = nextRoute ? `#/${nextRoute}` : "#";

    setRoute(nextRoute);
    window.history.pushState(null, "", nextHash);
    window.scrollTo(0, 0);
  }

  if (route === "assistant") {
    return <AssistantPage onNavigate={navigate} />;
  }

  if (route === "trip-cost") {
    return <TripCostPage onNavigate={navigate} />;
  }

  return <HomePage onNavigate={navigate} />;
}

createRoot(document.getElementById("root")).render(<App />);
