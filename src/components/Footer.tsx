export default function Footer() {
  return (
    <footer className="relative z-20 bg-white px-6 py-12 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-black/20 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>TEDx Panteion University</p>
        <div className="flex gap-6 italic">
          <a className="nav-link" href="#events">
            EVENTS
          </a>
          <a className="nav-link" href="#team">
            TEAM
          </a>
          <a className="nav-link" href="#about">
            ABOUT
          </a>
        </div>
      </div>
    </footer>
  );
}
