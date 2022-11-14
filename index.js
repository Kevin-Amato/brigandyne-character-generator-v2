import races from "./data/races.js";
import archetypes from "./data/archetypes.js";
import { getNode, newRow, setArchetype, setSecondaryStats } from "./utils.js";

const btn = getNode("button");
const saveBtn = getNode("#saveBtn");
const raceIs = getNode("#race");

const archetypeNode = getNode("#displayArchetype");
const lockArchetype = getNode("#lockArchetype");
const selectedArchetype = getNode("#selectedArchetype");

btn.addEventListener("click", () => {
  // reset previous generation
  getNode("#tBodyPrimary").innerHTML = "";
  saveBtn.setAttribute("disabled", "");
  lockArchetype.removeAttribute("disabled");

  const checkedRaces = [];
  const raceList = document.querySelectorAll("input");

  raceList.forEach((race) => {
    race.checked
      ? checkedRaces.push(race.nextSibling.data.trim().toLowerCase())
      : null;
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
  archetypeNode.removeAttribute("hidden");
});

lockArchetype.addEventListener("click", () => {
  const archetype = archetypes.find((a) => a.name === selectedArchetype.value);
  setArchetype(archetype);
});

saveBtn.addEventListener("click", function () {
  html2canvas(document.querySelector("#capture"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});
