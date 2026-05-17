import { teamGroups } from "@/data/team";
import Image from "next/image";

function CoverTitle({ id, label, className = "" }: { id: string; label: string; className?: string }) {
  return (
    <h2 id={id} className={`cover-title ${className}`} aria-label={label}>
      <svg className="cover-title-svg" viewBox="0 0 1000 185" aria-hidden="true" focusable="false">
        <text x="-10" y="179" textLength="1020" lengthAdjust="spacingAndGlyphs">
          {label}
        </text>
      </svg>
    </h2>
  );
}

export default function TeamSection() {
  const renderTeamCopy = (team: (typeof teamGroups)[number], className: string) => (
    <div className={className}>
      <h3>{team.name}</h3>
      <ul aria-label={`${team.name} members`}>
        {team.members.map((member) => (
          <li key={member.name}>
            {member.director ? "(D) " : ""}
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="team" className="cover-section teams-cover" aria-labelledby="team-title">
      <CoverTitle id="team-title" label="TEAMS" className="teams-title" />

      <div className="teams-content" aria-label="TEDx Panteion University teams">
        {teamGroups.map((team) => {
          return (
            <article key={team.name} className={`team-group team-group-${team.slug}`}>
              <div className="team-card-collage" aria-label={`${team.name} photo`}>
                <figure className="team-photo-card">
                  <Image
                    src={team.image.src}
                    alt={`${team.name} members`}
                    width={team.image.width}
                    height={team.image.height}
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 82vw, 68vw"
                    className="team-photo-image"
                  />
                </figure>
              </div>

              <div className="team-copy-stack">
                {renderTeamCopy(team, "team-copy")}
              </div>
            </article>
          );
        })}
      </div>
      <div className="teams-end-spacer h-150 bg-white" aria-hidden="true" />
    </section>
  );
}
