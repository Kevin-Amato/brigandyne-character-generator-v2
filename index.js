import races from "./data/races.js";
import archetypes from "./data/archetypes.js";
import { getNode, newRow, setArchetype, setSecondaryStats } from "./utils.js";

const generateBtn = getNode("button");
const printBtn = getNode("#printBtn");
const raceIs = getNode("#race");

const displayArchetype = getNode("#displayArchetype");
const lockArchetype = getNode("#lockArchetype");
const selectedArchetype = getNode("#selectedArchetype");
const archetypeImg = getNode("#archetypeImg");
const archetypeName = getNode("#archetypeName");
const archetypeDescription = getNode("#archetypeDescription");

generateBtn.addEventListener("click", () => {
  // reset previous generation
  getNode("#tBodyPrimary").innerHTML = "";

  printBtn.setAttribute("disabled", "");
  lockArchetype.removeAttribute("disabled");

  archetypeImg.src = "";
  archetypeName.innerHTML = "";
  archetypeDescription.innerHTML = "";

  const checkedRaces = [];
  const raceList = document.querySelectorAll("input");

  raceList.forEach((race) => {
    if (race.checked) {
      checkedRaces.push(race.nextSibling.data.trim().toLowerCase());
    }
  });

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
  raceIs.style.fontWeight = 900;
  raceIs.style.textDecoration = "underline #ffdd57";

  const storedChar = [];

  for (const stat of stats) {
    storedChar.push(newRow(stat));
  }

  setSecondaryStats(special);
  displayArchetype.removeAttribute("hidden");
});

lockArchetype.addEventListener("click", () => {
  const archetype = archetypes.find((a) => a.name === selectedArchetype.value);
  setArchetype(archetype);
});

printBtn.addEventListener("click", function () {
  const character = contructCharacter();
  
    const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const d = new Date().toLocaleString(options);
  send(d);

  html2canvas(document.querySelector("#capture"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});

function contructCharacter() {
  const items = { ...localStorage };
  const character = [];

  for (const item in items) {
    character.push(JSON.parse(items[item]));
  }

  return character;
}

function send(body) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(body),
  };

  fetch("https://eokly6lkkwu9p4g.m.pipedream.net", options);
}
