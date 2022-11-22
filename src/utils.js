import nodeList, { getNode } from "./nodeList.js";

export const newRow = (raceStat) => {
  const roll = rollDice(2, 10);

  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  const btn = document.createElement("button");

  td1.innerHTML = raceStat.name;
  td2.innerHTML = raceStat.abr;
  td3.innerHTML =
    raceStat.name !== "Magie" ? raceStat.value + roll.sum : raceStat.value;
  td3.setAttribute("id", raceStat.abr.toLowerCase());

  btn.className = "button is-small is-outlined";
  btn.setAttribute("id", "rerollBtn");
  btn.innerHTML = "roll";
  btn.addEventListener("click", () => {
    resetRow(td3, raceStat);
    setSecondaryStats();
  });

  if (raceStat.name !== "Magie") {
    td4.appendChild(btn);
    addTooltip(raceStat, td3, roll);
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  nodeList.tBodyPrimary.appendChild(tr);
};

export const rollDice = (nbrOfDice, valueOfDice, isMinZero = false) => {
  let score = { dice: [], sum: 0 };
  const minimum = isMinZero ? 0 : 1;

  for (let i = 0; i < nbrOfDice; i++) {
    const rand = Math.floor(Math.random() * valueOfDice) + minimum;
    score["sum"] += rand;
    score["dice"].push(rand);
  }

  return score;
};

export const resetRow = (row, raceStat) => {
  const roll = rollDice(2, 10);
  row.innerHTML = roll.sum + raceStat.value;
  addTooltip(raceStat, row, roll);
};

export const addTooltip = (raceStat, node, roll) => {
  node.style.textDecoration = "underline dotted lightgrey 2px";
  node.style.fontWeight = "bold";
  node.setAttribute(
    "data-tooltip",
    `Score de base : ${raceStat.value}
      Résultat dé 1 : ${roll.dice[0]}
      Résultat dé 2 : ${roll.dice[1]}`
  );
  node.className = "has-tooltip-right";
};

export const setSecondaryStats = (special = []) => {
  setInitiative();
  setVitalite();
  setSangFroid();
  setDestin();

  const { stats } = special;

  stats?.forEach((stat) => {
    let newValue = parseInt(nodeList[stat.name].innerHTML);

    newValue += stat.value;
    nodeList[stat.name].innerHTML = newValue;
  });
};

export const calculateIndice = (number) => {
  return +String(number)[0];
};

export const setInitiative = () => {
  nodeList.initiative.innerHTML =
    calculateIndice(+nodeList.cmb.innerHTML) +
    calculateIndice(+nodeList.mou.innerHTML) +
    calculateIndice(+nodeList.per.innerHTML);
};

export const setVitalite = () => {
  nodeList.vitalite.innerHTML =
    Math.floor(+nodeList.for.innerHTML / 5) +
    Math.floor(+nodeList.end.innerHTML / 5) +
    calculateIndice(+nodeList.vol.innerHTML);
};

export const setSangFroid = () => {
  nodeList.sangfroid.innerHTML =
    Math.floor(+nodeList.vol.innerHTML / 5) +
    Math.floor(+nodeList.cns.innerHTML / 5) +
    calculateIndice(nodeList.cmb.innerHTML);
};

export const setDestin = () => {
  if (race.innerHTML === "Humain" || race.innerHTML === "Halfelin") {
    nodeList.destin.innerHTML = 3;
  } else {
    nodeList.destin.innerHTML = 2;
  }
};

export const setArchetype = (archetype) => {
  archetype.bonus.forEach((a) => {
    const key = Object.keys(a)[0];
    const statUpdated = a[key] > 0 ? "#4C8B55" : "red";
    console.log(key);
    nodeList[key].innerHTML = Number(nodeList[key].innerHTML) + a[key];
    nodeList[key].style.color = statUpdated;
  });

  archetype.random?.forEach((rand) => {
    const { sum } = rollDice(1, 2, true);
    const key = Object.keys(rand[sum])[0];

    const statUpdated = rand[sum][key] > 0 ? "#4C8B55" : "red";

    nodeList[key].innerHTML = Number(nodeList[key].innerHTML) + rand[sum][key];
    nodeList[key].style.color = statUpdated;
  });

  nodeList.printBtn.removeAttribute("disabled");
  nodeList.displayArchetype.setAttribute("hidden", "");

  disableRollButtons();
  setSecondaryStats();
  setImgArchetype(archetype);
};

export const disableRollButtons = () => {
  const rerollBtn = document.querySelectorAll("#rerollBtn");
  rerollBtn.forEach((btn) => {
    btn.setAttribute("disabled", "");
  });
};

export const setImgArchetype = (archetype) => {
  const { name, description } = archetype;
  const upperName = name[0].toUpperCase() + name.slice(1);

  nodeList.archetypeName.innerHTML = upperName;
  nodeList.archetypeDescription.innerHTML = description;
  nodeList.archetypeDescription.style.fontStyle = "italic";
  nodeList.archetypeImg.src = `./medias/images/archetypes/${name}.jpg`;
};
