export const getNode = (attribute) => {
  return document.querySelector(attribute);
};

export const newRow = (raceStats) => {
  const roll = rollDice(2, 10);

  const tBodyPrimary = document.querySelector("#tBodyPrimary");
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  const btn = document.createElement("button");

  td1.innerHTML = raceStats.name;
  td2.innerHTML = raceStats.abr;
  td3.innerHTML =
    raceStats.name !== "Magie" ? raceStats.value + roll.sum : raceStats.value;
  td3.setAttribute("id", raceStats.name.toLowerCase());

  btn.className = "button is-small is-outlined";
  btn.innerHTML = "roll";
  btn.addEventListener("click", () => {
    resetRow(td3, raceStats);
    setSecondaryStats();
  });

  if (raceStats.name !== "Magie") {
    td4.appendChild(btn);
    addTooltip(raceStats, td3, roll);
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tBodyPrimary.appendChild(tr);

  return {
    name: raceStats["name"].toLowerCase(),
    sum: raceStats.value + roll.sum,
    indice: +String(raceStats.value + roll.sum)[0],
  };
};

export const rollDice = (nbrOfDice, valueOfDice) => {
  valueOfDice++;
  let score = { dice: [], sum: 0 };

  for (let i = 0; i < nbrOfDice; i++) {
    const rand = Math.floor(Math.random() * valueOfDice);
    score["sum"] += rand;
    score["dice"].push(rand);
  }

  return score;
};

export const resetRow = (row, raceStats) => {
  const roll = rollDice(2, 10);
  row.innerHTML = roll.sum + raceStats.value;
  addTooltip(raceStats, row, roll);
};

export const addTooltip = (raceStats, node, roll) => {
  node.style.color = "#0000EE";
  node.setAttribute(
    "data-tooltip",
    `Score de base : ${raceStats.value}
      Résultat dé 1 : ${roll.dice[0]}
      Résultat dé 2 : ${roll.dice[1]}`
  );
  node.className = "has-tooltip-right";
};

export const setSecondaryStats = () => {
  const race = document.querySelector("#race");

  const combat = document.querySelector("#combat").innerHTML;
  const mouvement = document.querySelector("#mouvement").innerHTML;
  const perception = document.querySelector("#perception").innerHTML;
  const volonte = document.querySelector("#volonté").innerHTML;
  const force = document.querySelector("#force").innerHTML;
  const endurance = document.querySelector("#endurance").innerHTML;
  const connaissances = document.querySelector("#connaissances").innerHTML;

  const initiative = document.querySelector("#initiative");
  const vitalité = document.querySelector("#vitalité");
  const sangfroid = document.querySelector("#sangfroid");
  const destin = document.querySelector("#destin");

  initiative.innerHTML =
    calculateIndice(combat) +
    calculateIndice(mouvement) +
    calculateIndice(perception);

  vitalité.innerHTML =
    Math.floor(force / 5) +
    Math.floor(endurance / 5) +
    calculateIndice(volonte);

  sangfroid.innerHTML =
    Math.floor(volonte / 5) +
    Math.floor(connaissances / 5) +
    calculateIndice(combat);

  if (race.innerHTML === "Humain" || race.innerHTML === "Halfelin") {
    destin.innerHTML = 3;
  } else {
    destin.innerHTML = 2;
  }
};

export const calculateIndice = (number) => {
  return +String(number)[0];
};

export const setInitiative = () => {};
export const setVitalité = () => {};
export const setSangFroid = () => {};
