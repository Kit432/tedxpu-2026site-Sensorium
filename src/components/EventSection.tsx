import { eventItems, eventYearRows } from "@/data/eventData";

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

export default function EventSection() {
  return (
    <div className="site-sections">
      <section id="events" className="cover-section events-cover" aria-labelledby="events-title">
        <CoverTitle id="events-title" label="EVENTS" />

        <div className="section-inner year-stack" aria-label="Event years">
          {eventYearRows.map((row, rowIndex) => (
            <div key={rowIndex} className="year-row">
              {row.map((year, itemIndex) => {
                const isOverflowYear =
                  rowIndex === 1 && year === "2020" && (itemIndex === 0 || itemIndex === row.length - 1);

                return (
                  <span
                    key={`${rowIndex}-${itemIndex}-${year}`}
                    className={isOverflowYear ? "year-item year-item-overflow" : "year-item year-item-interactive"}
                  >
                    {year}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="section-inner event-list" aria-label="Event highlights">
          {eventItems.map((event) => (
            <article key={event.number} className="event-row">
              <span className="event-number">{event.number}</span>
              <div>
                <h3>{event.title}</h3>
                <p>{event.copy}</p>
              </div>
              <span className="event-arrow" aria-hidden="true">
                /
              </span>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="cover-section teams-cover" aria-labelledby="team-title">
        <CoverTitle id="team-title" label="TEAMS" className="teams-title" />
      </section>

      <section id="about" className="content-section" aria-labelledby="about-title">
        <div className="section-inner">
          <p className="section-eyebrow">About Sensorium</p>
          <div className="about-panel">
            <h2 id="about-title" className="sr-only">
              About
            </h2>
            <p>
              Sensorium is a one-day TEDx Panteion University experience about
              perception, memory, and the ways ideas move through the senses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
