export const targetDateMs = new Date("2026-05-23T00:00:00+03:00").getTime();

export type HeroDoodle = {
  name: string;
  src: string;
  left: string;
  top: string;
  width: string;
  rotate?: number;
};

export type HeroStaticDoodle = {
  name: string;
  src: string;
  left: string;
  top: string;
  cssWidth: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  rotate?: number;
};

// Doodle Animations
export const heroDoodles: HeroDoodle[] = [
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
];

// Static Black Doodles
export const heroStaticDoodles: HeroStaticDoodle[] = [
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
