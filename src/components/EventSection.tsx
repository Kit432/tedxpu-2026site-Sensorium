"use client";

import { eventYearRows, events } from "@/data/eventData";
import type { HistoryEvent } from "@/data/eventData";
import Image from "next/image";
import { useMemo, useState } from "react";

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

function EventMediaImage({ src, alt }: { src: string; alt: string }) {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={520}
      sizes="(max-width: 720px) 92vw, 36rem"
      className="event-detail-image"
      onError={() => setHidden(true)}
    />
  );
}

function EventDetailPanel({ event, onClose }: { event: HistoryEvent; onClose: () => void }) {
  const descriptionParagraphs = getDescriptionParagraphs(event.description);

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

          {event.sponsors ? <EventMediaImage src={event.sponsors} alt={`${event.year} sponsors`} /> : null}
        </div>

        <div className="event-speaker-list" aria-label={`${event.year} speakers`}>
          {event.speakers.map((speaker) => (
            <a key={`${speaker.name}-${speaker.title}`} href={speaker.url} target="_blank" rel="noreferrer">
              <span className="event-speaker-title">{speaker.title}</span>
              <span className="event-speaker-name">{speaker.name}</span>
            </a>
          ))}
        </div>
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
      <CoverTitle id="events-title" label="EVENTS" />

      <div className="section-inner year-stack" aria-label="Event years">
        {eventYearRows.map((row, rowIndex) => (
          <div key={rowIndex} className="year-row">
            {row.map((year, itemIndex) => {
              const isOverflowYear =
                rowIndex === 1 && year === "2020" && (itemIndex === 0 || itemIndex === row.length - 1);

              return (
                eventsByYear.has(year) && !isOverflowYear ? (
                  <button
                    key={`${rowIndex}-${itemIndex}-${year}`}
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
                  <span
                    key={`${rowIndex}-${itemIndex}-${year}`}
                    className={isOverflowYear ? "year-item year-item-overflow" : "year-item year-item-disabled"}
                    aria-disabled="true"
                  >
                    {year}
                  </span>
                )
              );
            })}
          </div>
        ))}
      </div>

      {selectedEvent ? (
        <div id="event-detail-panel" className="section-inner event-detail-shell">
          <EventDetailPanel event={selectedEvent} onClose={() => setSelectedYear(null)} />
        </div>
      ) : null}
    </section>
  );
}
