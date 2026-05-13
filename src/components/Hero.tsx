"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TARGET_DATE = new Date("2026-05-23T00:00:00+03:00").getTime();

type HeroDoodle = {
  name: string;
  src: string;
  left: string;
  top: string;
  width: string;
  rotate?: number;
};

type HeroStaticDoodle = {
  name: string;
  src: string;
  left: string;
  top: string;
  cssWidth: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  rotate?: number;
};

const heroDoodles: HeroDoodle[] = [
  {
    name: "nose",
    src: "/assets/doodle-animations/nose.mp4",
    left: "-16.5%",
    top: "-2.2%",
    width: "14.1%",
  },
  {
    name: "pink ear",
    src: "/assets/doodle-animations/ear.mp4",
    left: "17.8%",
    top: "-10.2%",
    width: "10.8%",
    rotate: -26.2,
  },
  {
    name: "sensorium o eye",
    src: "/assets/doodle-animations/eye.mp4",
    left: "42.3%",
    top: "17.7%",
    width: "24.3%",
  },
  {
    name: "top right eye",
    src: "/assets/doodle-animations/eye.mp4",
    left: "99.6%",
    top: "5.2%",
    width: "16.4%",
  },
  {
    name: "pink hand",
    src: "/assets/doodle-animations/hand.mp4",
    left: "79.5%",
    top: "67.2%",
    width: "13.1%",
    rotate: 36.1,
  },
  {
    name: "mouth",
    src: "/assets/doodle-animations/mouth.mp4",
    left: "16%",
    top: "72.4%",
    width: "14.5%",
  },
] as const;

const heroStaticDoodles: HeroStaticDoodle[] = [
  {
    name: "flower",
    src: "/assets/doodles/flower.svg",
    left: "-8.4%",
    top: "52.4%",
    cssWidth: "11.8%",
    intrinsicWidth: 102,
    intrinsicHeight: 134,
    rotate: -7,
  },
  {
    name: "music note",
    src: "/assets/doodles/music.svg",
    left: "38.2%",
    top: "-12.8%",
    cssWidth: "11.7%",
    intrinsicWidth: 112,
    intrinsicHeight: 113,
    rotate: 0,
  },
  {
    name: "sun",
    src: "/assets/doodles/sun.svg",
    left: "82.2%",
    top: "13.6%",
    cssWidth: "8.2%",
    intrinsicWidth: 84,
    intrinsicHeight: 97,
  },
  {
    name: "cup",
    src: "/assets/doodles/cup.svg",
    left: "32.4%",
    top: "100.8%",
    cssWidth: "12.2%",
    intrinsicWidth: 121,
    intrinsicHeight: 135,
    rotate: -4,
  },
  {
    name: "pencil",
    src: "/assets/doodles/pencil.svg",
    left: "100%",
    top: "87.2%",
    cssWidth: "8.3%",
    intrinsicWidth: 88,
    intrinsicHeight: 114,
  },
];

function getCountdownLabel() {
  const distance = Math.max(0, TARGET_DATE - Date.now());
  const totalMinutes = Math.floor(distance / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return [days, hours, minutes]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function DoodleVideo({ doodle }: { doodle: HeroDoodle }) {
  return (
    <div
      className="hero-doodle"
      aria-hidden="true"
      style={{
        left: doodle.left,
        top: doodle.top,
        width: doodle.width,
        rotate: `${doodle.rotate ?? 0}deg`,
      }}
    >
      <video
        className="hero-doodle-video"
        src={doodle.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        title=""
      />
    </div>
  );
}

function StaticDoodle({ doodle }: { doodle: HeroStaticDoodle }) {
  return (
    <div
      className="hero-static-doodle"
      aria-hidden="true"
      style={{
        left: doodle.left,
        top: doodle.top,
        width: doodle.cssWidth,
        rotate: `${doodle.rotate ?? 0}deg`,
      }}
    >
      <Image
        src={doodle.src}
        alt=""
        width={doodle.intrinsicWidth}
        height={doodle.intrinsicHeight}
        className="hero-static-doodle-image"
      />
    </div>
  );
}

export default function Hero() {
  const staticDoodleGroupRef = useRef<HTMLDivElement | null>(null);
  const [countdown, setCountdown] = useState(getCountdownLabel);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdownLabel());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const staticLayer = staticDoodleGroupRef.current;

    if (!staticLayer) {
      return;
    }

    let frame = 0;

    const updateStaticDoodlePosition = () => {
      frame = 0;

      const stepSize = 28;
      const speed = 0.65;
      const steppedScrollY = Math.floor(window.scrollY / stepSize) * stepSize;
      const staticDoodleY = steppedScrollY * -speed;

      staticLayer.style.transform = `translate3d(0, ${staticDoodleY}px, 0)`;
    };

    const requestStaticDoodleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateStaticDoodlePosition);
    };

    updateStaticDoodlePosition();
    window.addEventListener("scroll", requestStaticDoodleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestStaticDoodleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestStaticDoodleUpdate);
      window.removeEventListener("resize", requestStaticDoodleUpdate);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative z-0 h-[185svh] overflow-visible"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 pb-12 pt-36 sm:px-10 sm:pt-44">
        <div className="sensorium-stage">
          <div className="hero-pinned-layer">
            <div className="hero-video-doodle-layer" aria-hidden="true">
              {heroDoodles.map((doodle) => (
                <DoodleVideo
                  key={`${doodle.name}-${doodle.left}`}
                  doodle={doodle}
                />
              ))}
            </div>

            <Image
              src="/assets/sensorium.svg"
              alt="Sensorium wordmark"
              width={1275}
              height={462}
              priority
              className="hero-wordmark"
            />
          </div>

          <div
            ref={staticDoodleGroupRef}
            className="hero-static-doodle-group"
            aria-hidden="true"
          >
            {heroStaticDoodles.map((doodle) => (
              <StaticDoodle key={doodle.name} doodle={doodle} />
            ))}

            <p
              className="hero-timer"
              aria-label="Countdown to 23 May 2026"
              suppressHydrationWarning
            >
              {countdown}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
