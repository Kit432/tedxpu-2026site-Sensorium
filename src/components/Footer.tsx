import { navItems } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-white px-6 py-12 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-black/20 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>TEDx Panteion University</p>
        <div className="flex gap-6 italic">
          {navItems.map((item) => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
