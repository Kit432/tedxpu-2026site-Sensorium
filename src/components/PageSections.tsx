const eventItems = [
  {
    number: "01",
    title: "Main Stage",
    copy: "Talks, performances, and sensory interruptions shaped around this year's theme.",
  },
  {
    number: "02",
    title: "Installations",
    copy: "Interactive moments around the venue before and between sessions.",
  },
  {
    number: "03",
    title: "After Hours",
    copy: "A closing gathering for the TEDx Panteion University community.",
  },
];

const teamItems = ["Curation", "Production", "Experience", "Partnerships"];

const eventYearRows = [
  ["X.ANNIVERSARY", "2025", "2024"],
  ["2020", "2023", "2022", "2021", "2020", "2020"],
  ["2019", "2018", "2017", "2016"],
];

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

export default function PageSections() {
  return (
    <div className="site-sections">
      <section id="events" className="cover-section events-cover" aria-labelledby="events-title">
        <CoverTitle id="events-title" label="EVENTS" />

        <div className="section-inner year-stack" aria-label="Event years">
          {eventYearRows.map((row, rowIndex) => (
            <div key={rowIndex} className="year-row">
              {row.map((year, itemIndex) => (
                <span
                  key={`${rowIndex}-${itemIndex}-${year}`}
                  className={year === "2017" ? "year-item active" : "year-item"}
                >
                  {year}
                </span>
              ))}
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

        <div className="section-inner">
          <div className="team-grid" aria-label="Team groups">
            {teamItems.map((item) => (
              <article key={item} className="team-tile">
                <span className="event-number">{item.slice(0, 2).toUpperCase()}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
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
