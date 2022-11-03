const nodeList = {};

export const getNode = (attribute) => {
  return document.querySelector(attribute);
};

export const newRow = (raceStats) => {
  const roll = rollDice(2, 10);

  const tBodyPrimary = getNode("#tBodyPrimary");
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

function setnodeList() {
  // display race name
  nodeList.race = getNode("#race");

  // primary stats
  nodeList.combat = getNode("#combat").innerHTML;
  nodeList.mouvement = getNode("#mouvement").innerHTML;
  nodeList.perception = getNode("#perception").innerHTML;
  nodeList.volonte = getNode("#volonté").innerHTML;
  nodeList.force = getNode("#force").innerHTML;
  nodeList.endurance = getNode("#endurance").innerHTML;
  nodeList.connaissances = getNode("#connaissances").innerHTML;

  // secondary stats
  nodeList.initiative = getNode("#initiative");
  nodeList.vitalité = getNode("#vitalité");
  nodeList.sangfroid = getNode("#sangfroid");
  nodeList.destin = getNode("#destin");
}

export const setSecondaryStats = () => {
  setnodeList();

  setInitiative();
  setVitalite();
  setSangFroid();
  setDestin();
};

export const calculateIndice = (number) => {
  return +String(number)[0];
};

export const setInitiative = () => {
  nodeList.initiative.innerHTML =
    calculateIndice(nodeList.combat) +
    calculateIndice(nodeList.mouvement) +
    calculateIndice(nodeList.perception);
};

export const setVitalite = () => {
  nodeList.vitalité.innerHTML =
    Math.floor(nodeList.force / 5) +
    Math.floor(nodeList.endurance / 5) +
    calculateIndice(nodeList.volonte);
};

export const setSangFroid = () => {
  nodeList.sangfroid.innerHTML =
    Math.floor(nodeList.volonte / 5) +
    Math.floor(nodeList.connaissances / 5) +
    calculateIndice(nodeList.combat);
};

export const setDestin = () => {
  if (race.innerHTML === "Humain" || race.innerHTML === "Halfelin") {
    nodeList.destin.innerHTML = 3;
  } else {
    nodeList.destin.innerHTML = 2;
  }
};
