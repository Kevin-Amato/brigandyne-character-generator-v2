import archetypes from "./data/archetypes.js";
import names from "./data/names.js";
import races from "./data/races.js";
import { getNode, newRow, setArchetype, setSecondaryStats, findLowestStat, disableAllRollButtons } from "./utils.js";

let currentStats = [];

const generateBtn = getNode("button");
const printBtn = getNode("#printBtn");
const raceIs = getNode("#race");

const displayArchetype = getNode("#displayArchetype");
const lockArchetype = getNode("#lockArchetype");
const selectedArchetype = getNode("#selectedArchetype");
const archetypeImg = getNode("#archetypeImg");
const archetypeName = getNode("#archetypeName");
const archetypeDescription = getNode("#archetypeDescription");

const generateName = getNode("#generateName");
const charName = getNode("#charName");
const lockedName = getNode("#lockedName");

generateName.addEventListener("click", () => {
  selectRandomName();
});

generateBtn.addEventListener("click", () => {
  lockedName.innerText = "";
  getNode("#tBodyPrimary").innerHTML = "";

  printBtn.setAttribute("disabled", "");
  lockArchetype.removeAttribute("disabled");

  archetypeImg.src = "";
  archetypeName.innerHTML = "";
  archetypeDescription.innerHTML = "";

  const checkedRaces = Array.from(document.querySelectorAll(".race-checkbox:checked"))
    .map((cb) => cb.value);

  const rand = Math.floor(
    Math.random() *
      (checkedRaces.length <= 0 ? races.length : checkedRaces.length)
  );
  const checkedRaceList = races.filter((race) =>
    checkedRaces.includes(race.race.toLowerCase())
  );
  const { race, stats, special } =
    checkedRaces.length <= 0 ? races[rand] : checkedRaceList[rand];

  raceIs.innerHTML = race;

  const humanRace = races.find((r) => r.race === "Humain");
  const humanBaseStats = {};
  humanRace.stats.forEach((s) => { humanBaseStats[s.id] = s.value; });

  const lowestId = findLowestStat(stats);

  stats.forEach((stat) => {
    const raceMod = stat.value - humanBaseStats[stat.id];
    stat.raceMods = { [stat.id]: raceMod };
    stat.archetypeMods = {};
    newRow(stat, stat.id === lowestId, stat.raceMods, stat.archetypeMods);
  });

  currentStats = stats;

  setSecondaryStats(special);
  displayArchetype.removeAttribute("hidden");
});

lockArchetype.addEventListener("click", () => {
  const archetype = archetypes.find((a) => a.name === selectedArchetype.value);
  setArchetype(archetype, currentStats);

  if (charName.value.length === 0) {
    selectRandomName();
  }

  lockedName.innerText = charName.value;
  lockedName.style.fontWeight = 700;
  charName.value = "";
});

printBtn.addEventListener("click", function () {
  const character = constructCharacter();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  html2canvas(document.querySelector("#capture"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});

function constructCharacter() {
  const STAT_KEYS = [
    "combat",
    "connaissances",
    "discretion",
    "endurance",
    "force",
    "habilite",
    "magie",
    "mouvement",
    "perception",
    "sociabilite",
    "survie",
    "tir",
    "volonte",
  ];
  const character = [];

  STAT_KEYS.forEach((key) => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        character.push(JSON.parse(item));
      } catch {
        // skip corrupted entries
      }
    }
  });

  return character;
}

function selectRandomName() {
  const rndInt = Math.floor(Math.random() * names.length);
  charName.value = names[rndInt];
}

const genSection = getNode("#generator");
const contactSection = getNode("#contact");
const genLink = document.querySelector('a[href="#generate"]');
const contactLink = document.querySelector('a[href="#contact"]');

genSection.style.display = "block";
contactSection.style.display = "none";
genLink.style.fontWeight = "700";
contactLink.style.fontWeight = "400";

genLink.onclick = (e) => {
  e.preventDefault();
  genSection.style.display = "block";
  contactSection.style.display = "none";
  genLink.style.fontWeight = "700";
  contactLink.style.fontWeight = "400";
};

contactLink.onclick = (e) => {
  e.preventDefault();
  genSection.style.display = "none";
  contactSection.style.display = "block";
  genLink.style.fontWeight = "400";
  contactLink.style.fontWeight = "700";
};
