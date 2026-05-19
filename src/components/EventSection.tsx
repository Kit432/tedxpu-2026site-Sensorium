"use client";

import { eventYears, events } from "@/data/eventData";
import type { HistoryEvent } from "@/data/eventData";
import Image from "next/image";
import { useMemo, useState } from "react";

const anniversaryLink = "https://tedxpux.netlify.app/";

function CoverTitle({ id, label, className = "" }: { id: string; label: string; className?: string }) {
  return (
    <h2 id={id} className={`cover-title ${className}`} aria-label={label}>
      <svg className="cover-title-svg" viewBox="0 0 1000 185" aria-hidden="true" focusable="false">
        <text x="0" y="179" textLength="1000" lengthAdjust="spacingAndGlyphs">
          {label}
        </text>
      </svg>
    </h2>
  );
}

function getDescriptionParagraphs(description: string) {
  return description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const eventImageSizes: Record<string, { width: number; height: number }> = {
  "/assets/events/2016.avif": { width: 620, height: 300 },
  "/assets/events/2017.avif": { width: 1024, height: 533 },
  "/assets/events/2018.avif": { width: 1024, height: 427 },
  "/assets/events/2019.avif": { width: 1280, height: 532 },
  "/assets/events/2021.avif": { width: 1382, height: 1362 },
  "/assets/events/2022.avif": { width: 1240, height: 1240 },
  "/assets/events/2023.avif": { width: 670, height: 670 },
  "/assets/events/2024.avif": { width: 260, height: 132 },
  "/assets/events/2025.avif": { width: 2500, height: 1309 },
  "/assets/events/Sponsors2025.avif": { width: 1920, height: 1080 },
  "/assets/events/2026.avif": { width: 2500, height: 1309 },
  "/assets/events/Sponsors2026.avif": { width: 1920, height: 1080 },
};

function EventMediaImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [hidden, setHidden] = useState(false);
  const imageSize = eventImageSizes[src] ?? { width: 900, height: 520 };

  if (hidden) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={imageSize.width}
      height={imageSize.height}
      sizes="(max-width: 720px) calc(100vw - 2rem), 36rem"
      className={`event-detail-image ${className}`.trim()}
      onError={() => setHidden(true)}
    />
  );
}

function EventDetailPanel({ event, onClose }: { event: HistoryEvent; onClose: () => void }) {
  const descriptionParagraphs = getDescriptionParagraphs(event.description);
  const sponsorSpotlightSrc = event.year === 2026 ? event.sponsors : undefined;

  return (
    <article className="event-detail-panel" aria-live="polite">
      <div className="event-detail-heading">
        <p className="event-detail-year">{event.year}</p>
        <h3>{event.title}</h3>
        <button type="button" className="event-detail-close" onClick={onClose} aria-label="Close event details">
          Close
        </button>
      </div>

      <div className="event-detail-body">
        <div className="event-detail-main">
          {event.logo ? <EventMediaImage src={event.logo} alt={`${event.year} ${event.title} event logo`} /> : null}

          <div className="event-detail-copy">
            {descriptionParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="event-detail-links">
            {event.introVideo ? (
              <a href={event.introVideo} target="_blank" rel="noreferrer">
                Watch intro video
              </a>
            ) : null}
            {event.sponsors ? (
              <a href={event.sponsors} target="_blank" rel="noreferrer">
                View sponsors
              </a>
            ) : null}
          </div>

          {event.sponsors && !sponsorSpotlightSrc ? (
            <EventMediaImage src={event.sponsors} alt={`${event.year} sponsors`} />
          ) : null}
        </div>

        {sponsorSpotlightSrc ? (
          <aside className="event-sponsor-spotlight" aria-label={`${event.year} sponsors`}>
            <a href={sponsorSpotlightSrc} target="_blank" rel="noreferrer">
              <EventMediaImage
                src={sponsorSpotlightSrc}
                alt={`${event.year} sponsors`}
                className="event-sponsor-spotlight-image"
              />
            </a>
          </aside>
        ) : (
          <div className="event-speaker-list" aria-label={`${event.year} speakers`}>
            {event.speakers.map((speaker) => (
              <a key={`${speaker.name}-${speaker.title}`} href={speaker.url} target="_blank" rel="noreferrer">
                <span className="event-speaker-title">{speaker.title}</span>
                <span className="event-speaker-name">{speaker.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function EventSection() {
  const eventsByYear = useMemo(() => new Map(events.map((event) => [String(event.year), event])), []);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const selectedEvent = selectedYear ? eventsByYear.get(selectedYear) : null;

  return (
    <section id="events" className="cover-section events-cover" aria-labelledby="events-title">
      <CoverTitle id="events-title" label="EVENTS" className="events-title" />

      <div className="section-inner year-stack" aria-label="Event years">
        {eventYears.map((year) =>
          year === "X.ANNIVERSARY" ? (
            <a
              key={year}
              className="year-item year-item-interactive year-item-anniversary"
              href={anniversaryLink}
              target="_blank"
              rel="noreferrer"
            >
              {year}
            </a>
          ) : 
          eventsByYear.has(year) ? (
            <button
              key={year}
              type="button"
              className={
                selectedYear === year
                  ? "year-item year-item-interactive year-item-selected"
                  : "year-item year-item-interactive"
              }
              aria-pressed={selectedYear === year}
              aria-controls="event-detail-panel"
              onClick={() => setSelectedYear((currentYear) => (currentYear === year ? null : year))}
            >
              {year}
            </button>
          ) : (
            <span key={year} className="year-item year-item-disabled" aria-disabled="true">
              {year}
            </span>
          )
        )}
      </div>

      {selectedEvent ? (
        <div id="event-detail-panel" className="section-inner event-detail-shell">
          <EventDetailPanel event={selectedEvent} onClose={() => setSelectedYear(null)} />
        </div>
      ) : null}
    </section>
  );
}
