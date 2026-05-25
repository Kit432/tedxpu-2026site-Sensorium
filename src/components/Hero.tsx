"use client";

import { heroDoodles, heroStaticDoodles, targetDateMs } from "@/data/hero";
import type { HeroDoodle, HeroStaticDoodle } from "@/data/hero";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const eventStartedLabel = "Event Started";
const eventStartedVisibleUntilMs = targetDateMs + 24 * 60 * 60 * 1000;

function getTimerLabel() {
  const now = Date.now();

  if (now >= eventStartedVisibleUntilMs) {
    return null;
  }

  if (now >= targetDateMs) {
    return eventStartedLabel;
  }

  const distance = targetDateMs - now;
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
  const [timerLabel, setTimerLabel] = useState(getTimerLabel);

  useLayoutEffect(() => {
    setTimerLabel(getTimerLabel());
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimerLabel(getTimerLabel());
    }, 1000);

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setTimerLabel(getTimerLabel());
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("pageshow", handlePageShow);
    };
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

            {timerLabel ? (
              <p
                className="hero-timer"
                aria-label={
                  timerLabel === eventStartedLabel
                    ? eventStartedLabel
                    : "Countdown to 23 May 2026"
                }
                suppressHydrationWarning
              >
                {timerLabel}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
