export type TeamMember = {
  name: string;
  director?: boolean;
};

export type TeamGroup = {
  name: string;
  slug: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  members: TeamMember[];
};

const teamImage = (fileName: string, width: number, height: number) => ({
  src: `/assets/team/${fileName}`,
  width,
  height,
});

export const teamGroups: TeamGroup[] = [
  {
    name: "Curation Team",
    slug: "curation",
    image: teamImage("curation.webp", 2391, 1706),
    members: [
      {
        name: "Efstathiou Fanis",
      },
      {
        name: "Storismenou Alexandra",
      },
    ],
  },
  {
    name: "Graphics & Design Team",
    slug: "graphs",
    image: teamImage("graphs.webp", 4212, 1928),
    members: [
      {
        name: "Lykas Alkiviadis",
        director: true,
      },
      {
        name: "Loukakis Giorgos-F.",
      },
      {
        name: "Dimas Triantafyllos",
      },
      {
        name: "Sismanopoulou Aigli",
      },
    ],
  },
  {
    name: "Marketing & IT Team",
    slug: "mark",
    image: teamImage("marketing.webp", 5755, 1965),
    members: [
      {
        name: "Lekka Nikoleta",
        director: true,
      },
      {
        name: "Egglezopoulou Ioanna",
      },
      {
        name: "Soupila Marta",
      },
      {
        name: "Hajdari Kristiana",
      },
      {
        name: "Polydorou Eirini",
      },
      {
        name: "Lin Kit",
      },
    ],
  },
  {
    name: "Experience Team",
    slug: "exp",
    image: teamImage("exp.webp", 6041, 2015),
    members: [
      {
        name: "Koutsiouba Argyrh",
        director: true,
      },
      {
        name: "Aliftira Georgia",
      },
      {
        name: "Porfyris Alexandros",
      },
      {
        name: "Vaggeli Eirini",
      },
      {
        name: "Skordyli Eleytheria",
      },
      {
        name: "Christias Ilias",
      },
    ],
  },
  {
    name: "Speakers Team",
    slug: "speakers",
    image: teamImage("speakers.webp", 4605, 1733),
    members: [
      {
        name: "Mytakidis Sotiris",
      },
      {
        name: "Christou Artemis",
      },
      {
        name: "Koutsoumpa Eleni",
      },
      {
        name: "Georga Matina",
      },
    ],
  },
  {
    name: "Sponsorships Team",
    slug: "spons",
    image: teamImage("spons.webp", 5693, 1779),
    members: [
      {
        name: "Ntantalia Chysovalanto",
        director: true,
      },
      {
        name: "Kapnistou Maria",
      },
      {
        name: "Zoidi Georgia",
      },
      {
        name: "Leontarakis Iasonas",
      },
      {
        name: "Papanikolaou Evelina",
      },
    ],
  },
];
