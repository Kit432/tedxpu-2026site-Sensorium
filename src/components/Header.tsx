import { navItems } from "@/data/navigation";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[9999] bg-white/90 backdrop-blur px-5 sm:px-8 lg:px-9">
      <div className="flex items-start justify-between gap-6">
        <a href="#hero" className="block shrink-0" aria-label="TEDx Panteion University home">
          <Image
            src="/assets/tedxpu-logo.svg"
            alt="TEDx Panteion University"
            width={341}
            height={123}
            priority
            className="h-auto w-33 sm:w-90"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap justify-end gap-x-8 gap-y-2 pt-18 text-[17px] font-extralight italic tracking-[0] text-black sm:gap-x-11 sm:text-[32px]"
        >
          {navItems.map((item) => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
