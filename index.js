import races from "./data/races.js";
import { newRow, setSecondaryStats } from "./utils.js";

const generateBtn = document.querySelector("button");
const raceElt = document.querySelector("#race");

generateBtn.addEventListener("click", () => {
  document.querySelector("#tBodyPrimary").innerHTML = "";

  const rand = Math.floor(Math.random() * races.length);
  const { race, stats } = races[rand];

  raceElt.innerHTML = race;
  raceElt.style.fontWeight = 900;
  raceElt.style.textDecoration = "underline #ffdd57";

  const storedChar = [];
  for (const d of stats) {
    storedChar.push(newRow(d));
  }

  setSecondaryStats(storedChar);

  console.log(`Personnages générés : ${characterCreated}`);
});
