"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    left: "-14.0%",
    top: "8.2%",
    width: "11.1%",
  },
  {
    name: "pink ear",
    src: "/assets/doodle-animations/ear.mp4",
    left: "22.8%",
    top: "0.2%",
    width: "9.4%",
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
    width: "14.4%",
  },
  {
    name: "pink hand",
    src: "/assets/doodle-animations/hand.mp4",
    left: "79.5%",
    top: "67.2%",
    width: "10.1%",
    rotate: 36.1,
  },
  {
    name: "mouth",
    src: "/assets/doodle-animations/mouth.mp4",
    left: "16%",
    top: "72.4%",
    width: "11.5%",
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
    left: "35.8%",
    top: "-4.8%",
    cssWidth: "10.2%",
    intrinsicWidth: 112,
    intrinsicHeight: 113,
    rotate: -8,
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
    <motion.div
      className="hero-doodle"
      aria-hidden="true"
      style={{
        left: doodle.left,
        top: doodle.top,
        width: doodle.width,
      }}
      initial={{
        opacity: 0,
        scale: 0.9,
        rotate: (doodle.rotate ?? 0) - 4,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: doodle.rotate ?? 0,
      }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
    </motion.div>
  );
}

function StaticDoodle({ doodle }: { doodle: HeroStaticDoodle }) {
  return (
    <motion.div
      className="hero-static-doodle"
      aria-hidden="true"
      style={{
        left: doodle.left,
        top: doodle.top,
        width: doodle.cssWidth,
      }}
      initial={{
        opacity: 0,
        scale: 0.9,
        rotate: (doodle.rotate ?? 0) - 4,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: doodle.rotate ?? 0,
      }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={doodle.src}
        alt=""
        width={doodle.intrinsicWidth}
        height={doodle.intrinsicHeight}
        className="hero-static-doodle-image"
      />
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /**
   * This moves ONLY the static doodles/timer.
   * Sensorium and MP4 doodles do not move.
   */
  const staticDoodleGroupY = useTransform(
    scrollYProgress,
    [0, 0.000001],
    [0, -260]
  );

  const [countdown, setCountdown] = useState(getCountdownLabel);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdownLabel());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-0 h-[145svh] overflow-visible"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 pb-12 pt-36 sm:px-10 sm:pt-44">
        <motion.div
          className="sensorium-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* PINNED LAYER: Sensorium + MP4 doodles */}
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

          {/* SCROLLING LAYER: black/static doodles + timer */}
          <motion.div
            className="hero-static-doodle-group"
            style={{ y: staticDoodleGroupY }}
            aria-hidden="true"
          >
            {heroStaticDoodles.map((doodle) => (
              <StaticDoodle key={doodle.name} doodle={doodle} />
            ))}

            <motion.p
              className="hero-timer"
              initial={{ opacity: 0, x: "-50%", y: 14 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label="Countdown to 23 May 2026"
              suppressHydrationWarning
            >
              {countdown}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}