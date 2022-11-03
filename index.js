import races from "./data/races.js";
import { getNode, newRow, setSecondaryStats } from "./utils.js";

const btn = getNode("button");
const raceIs = getNode("#race");

btn.addEventListener("click", () => {
  getNode("#tBodyPrimary").innerHTML = "";

  const rand = Math.floor(Math.random() * races.length);
  const { race, stats } = races[rand];

  raceIs.innerHTML = race;
  raceIs.style.fontWeight = 900;
  raceIs.style.textDecoration = "underline #ffdd57";

  setSecondaryStats();
});
