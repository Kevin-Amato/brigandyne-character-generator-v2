export default [
  {
    name: "aigle",
    description:
      "Ambitieux(-se), sûr(e) de moi, j'ai un fort esprit de compétition",
    bonus: [{ vol: 5 }],
    random: [[{ cns: 5 }, { per: 5 }]],
  },
  {
    name: "ane",
    description: "Tranquille, altruiste, plaisantin et têtu(e)",
    bonus: [{ end: 5 }, { vol: 5 }, { cns: 5 }],
    random: [[{ hab: 5 }, { sur: 5 }]],
  },
  {
    name: "cerf",
    description: "Honorable, droit(e) dans mes bottes, et fier(e)",
    bonus: [{ soc: 5 }, { vol: 5 }],
    random: [
      [{ sur: 5 }, { mou: 5 }],
      [{ dis: -5 }, { tir: -5 }],
    ],
  },
  {
    name: "chat",
    description: "Svelte, charmeur(-se), mystérieux(-se), parfois cruel(-le)",
    bonus: [{ dis: 5 }, { mou: 5 }, { per: 5 }],
    random: [[{ for: -5 }, { vol: -5 }]],
  },
  {
    name: "chien",
    description:
      "Amical(e), loyal(e), courageux (-se), mais aussi impulsif(-ive)",
    bonus: [{ end: 5 }, { per: 5 }, { soc: 5 }],
    random: [[{ dis: -5 }, { hab: -5 }]],
  },
  {
    name: "coq",
    description: "Vaniteux(-se), va-t-en-guerre, et séducteur(-trice)",
    bonus: [{ cmb: 5 }, { soc: 5 }],
    random: [[{ dis: -5 }, { hab: -5 }]],
  },
  {
    name: "corbeau",
    description: "Mystérieux(-se), d’allure sombre, j’ai mauvaise réputation",
    bonus: [{ cns: 5 }, { vol: 5 }, { soc: 5 }],
    random: [[{ dis: -5 }, { sur: -5 }]],
  },
  {
    name: "fourmi",
    description: "Plutôt petit(e), travailleur(-se), sérieux(-se)",
    bonus: [{ hab: 5 }, { vol: 5 }],
    random: [
      [{ cns: 5 }, { dis: 5 }],
      [{ per: -5 }, { soc: -5 }],
    ],
  },
  {
    name: "hibou",
    description: "Je-sais-tout, travailleur(-se), exigeant(e)",
    bonus: [{ cns: 10 }, { cmb: -5 }],
    random: [
      [{ hab: 5 }, { per: 5 }],
      [{ soc: 5 }, { vol: 5 }],
    ],
  },
  {
    name: "hyene",
    description: "Moqueur(-se), cruel(-le), violent(e)",
    bonus: [{ cmb: 5 }],
    random: [
      [{ dis: 5 }, { mou: 5 }],
      [{ for: -5 }, { vol: -5 }],
    ],
  },
  {
    name: "lapin",
    description: "Plutôt petit(e), enjoué(e), j’aime plaire",
    bonus: [
      { dis: 5 },
      { mou: 5 },
      { per: 5 },
      { soc: 10 },
      { cmb: -5 },
      { for: -5 },
    ],
  },
  {
    name: "lion",
    description: "Imposant(e), charismatique, j'ai une forte estime de moi",
    bonus: [{ cmb: 5 }, { for: 5 }, { soc: 5 }, { dis: -1 }],
    random: [[{ cns: -5 }, { hab: -5 }]],
  },
  {
    name: "loup",
    description: "Patibulaire, violent(e), loyal(e)",
    bonus: [{ cmb: 5 }, { soc: -5 }],
    random: [[{ per: 5 }, { sur: 5 }]],
  },
  {
    name: "mouton",
    description: "Suiveur(-se), prudent(e), amical(e)",
    bonus: [{ hab: 5 }, { per: 5 }, { soc: 5 }, { vol: -5 }],
    random: [],
  },
  {
    name: "ours",
    description: "Gros(-se) et fort(e), mais aussi protecteur(-trice)",
    bonus: [{ for: 5 }, { end: 5 }],
    random: [
      [{ per: 5 }, { sur: 5 }],
      [{ cns: -5 }, { dis: -5 }],
    ],
  },
  {
    name: "paon",
    description: "Frivole, vaniteux(-se), soc",
    bonus: [{ soc: 10 }, { for: -5 }],
    random: [[{ cns: 5 }, { per: 5 }]],
  },
  {
    name: "porc",
    description:
      "Fort(e), gras(-se), lubrique, j'aime la fête et la bonne chère",
    bonus: [{ for: 5 }, { end: 5 }, { soc: 5 }],
    random: [[{ mou: -5 }, { cns: -5 }]],
  },
  {
    name: "rat",
    description: "Plutôt petit(e), avare, méchant(e)",
    bonus: [{ dis: 5 }, { for: -5 }],
    random: [
      [{ cns: 5 }, { vol: 5 }],
      [{ end: 5 }, { sur: 5 }],
    ],
  },
  {
    name: "renard",
    description: "Plutôt svelte, rusé(e), séducteur(-trice)",
    bonus: [{ mou: 5 }, { soc: 5 }],
    random: [
      [{ hab: 5 }, { dis: 5 }],
      [{ end: -5 }, { for: -5 }],
    ],
  },
  {
    name: "serpent",
    description: "Froid(e), calculateur(-trice), cynique",
    bonus: [{ cns: 5 }, { soc: 5 }, { vol: 5 }],
    random: [{ mou: -5 }, { per: -5 }],
  },
  {
    name: "singe",
    description: "Agile, amical(e), moqueur(-se), plaisantin",
    bonus: [{ mou: 10 }, { soc: 5 }, { vol: -5 }],
  },
  {
    name: "souris",
    description: "Plutôt petit(e), enjoué(e), courageux(-se)",
    bonus: [
      { dis: 10 },
      { hab: 5 },
      { mou: 5 },
      { soc: 5 },
      { cmb: -5 },
      { for: -5 },
    ],
  },
  {
    name: "taureau",
    description: "Gros (-se) et fort(e), violent(e), j’aime m’imposer",
    bonus: [{ cmb: 5 }, { end: 5 }, { for: 5 }, { dis: -5 }],
    random: [[{ cns: -5 }, { hab: -5 }]],
  },
  {
    name: "vautour",
    description: "Dégingandé(e), moqueur(-se), cynique",
    bonus: [{ per: 5 }, { vol: 5 }],
    random: [
      [{ cns: 5 }, { end: 5 }],
      [{ mou: -5 }, { soc: -5 }],
    ],
  },
];
