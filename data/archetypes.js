export default [
  {
    name: "aigle",
    description:
      "Ambitieux(-se), sûr(e) de moi, j'ai un fort esprit de compétition",
    bonus: [{ volonte: 5 }],
    random: [[{ connaissances: 5 }, { perception: 5 }]],
  },
  {
    name: "ane",
    description: "Tranquille, altruiste, plaisantin et têtu(e)",
    bonus: [{ endurance: 5 }, { volonte: 5 }, { connaissances: 5 }],
    random: [[{ habilite: 5 }, { survie: 5 }]],
  },
  {
    name: "cerf",
    description: "Honorable, droit(e) dans mes bottes, et fier(e)",
    bonus: [{ sociabilite: 5 }, { volonte: 5 }],
    random: [
      [{ survie: 5 }, { mouvement: 5 }],
      [{ discretion: -5 }, { tir: -5 }],
    ],
  },
  {
    name: "chat",
    description: "Svelte, charmeur(-se), mystérieux(-se), parfois cruel(-le)",
    bonus: [{ discretion: 5 }, { mouvement: 5 }, { perception: 5 }],
    random: [[{ force: -5 }, { volonte: -5 }]],
  },
  {
    name: "chien",
    description:
      "Amical(e), loyal(e), courageux (-se), mais aussi impulsif(-ive)",
    bonus: [{ endurance: 5 }, { perception: 5 }, { sociabilite: 5 }],
    random: [[{ discretion: -5 }, { habilite: -5 }]],
  },
  {
    name: "coq",
    description: "Vaniteux(-se), va-t-en-guerre, et séducteur(-trice)",
    bonus: [{ combat: 5 }, { sociabilite: 5 }],
    random: [[{ discretion: -5 }, { habilite: -5 }]],
  },
  {
    name: "corbeau",
    description: "Mystérieux(-se), d’allure sombre, j’ai mauvaise réputation",
    bonus: [{ connaissances: 5 }, { volonte: 5 }, { sociabilite: 5 }],
    random: [[{ discretion: -5 }, { survie: -5 }]],
  },
  {
    name: "fourmi",
    description: "Plutôt petit(e), travailleur(-se), sérieux(-se)",
    bonus: [{ habilite: 5 }, { volonte: 5 }],
    random: [
      [{ connaissances: 5 }, { discretion: 5 }],
      [{ perception: -5 }, { sociabilite: -5 }],
    ],
  },
  {
    name: "hibou",
    description: "Je-sais-tout, travailleur(-se), exigeant(e)",
    bonus: [{ connaissances: 10 }, { combat: -5 }],
    random: [
      [{ habilite: 5 }, { perception: 5 }],
      [{ sociabilite: 5 }, { volonte: 5 }],
    ],
  },
  {
    name: "hyene",
    description: "Mmoqueur(-se), cruel(-le), violent(e)",
    bonus: [{ combat: 5 }],
    random: [
      [{ discretion: 5 }, { mouvement: 5 }],
      [{ force: -5 }, { volonte: -5 }],
    ],
  },
  {
    name: "lapin",
    description: "Plutôt petit(e), enjoué(e), j’aime plaire",
    bonus: [
      { discretion: 5 },
      { mouvement: 5 },
      { perception: 5 },
      { sociabilite: 10 },
      { combat: -5 },
      { force: -5 },
    ],
  },
  {
    name: "lion",
    description: "Imposant(e), charismatique, j'ai une forte estime de moi",
    bonus: [
      { combat: 5 },
      { force: 5 },
      { sociabilite: 5 },
      { discretion: -1 },
    ],
    random: [[{ connaissances: -5 }, { habilite: -5 }]],
  },
  {
    name: "loup",
    description: "Patibulaire, violent(e), loyal(e)",
    bonus: [{ combat: 5 }, { sociabilite: -5 }],
    random: [[{ perception: 5 }, { survie: 5 }]],
  },
  {
    name: "mouton",
    description: "Suiveur(-se), prudent(e), amical(e)",
    bonus: [
      { habilite: 5 },
      { perception: 5 },
      { sociabilite: 5 },
      { volonte: -5 },
    ],
    random: [],
  },
  {
    name: "ours",
    description: "Gros(-se) et fort(e), mais aussi protecteur(-trice)",
    bonus: [{ force: 5 }, { endurance: 5 }],
    random: [
      [{ perception: 5 }, { survie: 5 }],
      [{ connaissances: -5 }, { discretion: -5 }],
    ],
  },
  {
    name: "paon",
    description: "Frivole, vaniteux(-se), sociabilite",
    bonus: [{ sociabilite: 10 }, { force: -5 }],
    random: [[{ connaissances: 5 }, { perception: 5 }]],
  },
  {
    name: "porc",
    description:
      "Fort(e), gras(-se), lubrique, j'aime la fête et la bonne chère",
    bonus: [{ force: 5 }, { endurance: 5 }, { sociabilite: 5 }],
    random: [[{ mouvement: -5 }, { connaissances: -5 }]],
  },
  {
    name: "rat",
    description: "Plutôt petit(e), avare, méchant(e)",
    bonus: [{ discretion: 5 }, { force: -5 }],
    random: [
      [{ connaissances: 5 }, { volonte: 5 }],
      [{ endurance: 5 }, { survie: 5 }],
    ],
  },
  {
    name: "renard",
    description: "Plutôt svelte, rusé(e), séducteur(-trice)",
    bonus: [{ mouvement: 5 }, { sociabilite: 5 }],
    random: [
      [{ habilite: 5 }, { discretion: 5 }],
      [{ endurance: -5 }, { force: -5 }],
    ],
  },
  {
    name: "serpent",
    description: "Froid(e), calculateur(-trice), cynique",
    bonus: [{ connaissances: 5 }, { sociabilite: 5 }, { volonte: 5 }],
    random: [{ mouvement: -5 }, { perception: -5 }],
  },
  {
    name: "singe",
    description: "Agile, amical(e), moqueur(-se), plaisantin",
    bonus: [{ mouvement: 10 }, { sociabilite: 5 }, { volonte: -5 }],
  },
  {
    name: "souris",
    description: "Plutôt petit(e), enjoué(e), courageux(-se)",
    bonus: [
      { discretion: 10 },
      { habilite: 5 },
      { mouvement: 5 },
      { sociabilite: 5 },
      { combat: -5 },
      { force: -5 },
    ],
  },
  {
    name: "taureau",
    description: "Gros (-se) et fort(e), violent(e), j’aime m’imposer",
    bonus: [{ combat: 5 }, { endurance: 5 }, { force: 5 }, { discretion: -5 }],
    random: [[{ connaissances: -5 }, { habilite: -5 }]],
  },
  {
    name: "vautour",
    description: "Dégingandé(e), moqueur(-se), cynique",
    bonus: [{ perception: 5 }, { volonte: 5 }],
    random: [
      [{ connaissances: 5 }, { endurance: 5 }],
      [{ mouvement: -5 }, { sociabilite: -5 }],
    ],
  },
];
