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
  addTooltip;
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
};

export const rollDice = (nbrOfDice, valueOfDice) => {
  let score = { dice: [], sum: 0 };

  for (let i = 0; i < nbrOfDice; i++) {
    const rand = Math.floor(Math.random() * valueOfDice) + 1;
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
  nodeList.combat = getNode("#combat");
  nodeList.connaissances = getNode("#connaissances");
  nodeList.discretion = getNode("#discrétion");
  nodeList.endurance = getNode("#endurance");
  nodeList.force = getNode("#force");
  nodeList.habilite = getNode("#habilité");
  nodeList.magie = getNode("#magie");
  nodeList.mouvement = getNode("#mouvement");
  nodeList.perception = getNode("#perception");
  nodeList.sociabilite = getNode("#sociabilité");
  nodeList.survie = getNode("#survie");
  nodeList.tir = getNode("#tir");
  nodeList.volonte = getNode("#volonté");

  // secondary stats
  nodeList.initiative = getNode("#initiative");
  nodeList.vitalité = getNode("#vitalité");
  nodeList.sangfroid = getNode("#sangfroid");
  nodeList.destin = getNode("#destin");
}

export const setSecondaryStats = (special) => {
  setnodeList();

  const { stats } = special;

  stats.forEach((stat) => {
    let newValue = parseInt(nodeList[stat.name].innerHTML);
    newValue += stat.value;
    nodeList[stat.name].innerHTML = newValue;
  });

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
    calculateIndice(nodeList.combat.innerHTML) +
    calculateIndice(nodeList.mouvement.innerHTML) +
    calculateIndice(nodeList.perception.innerHTML);
};

export const setVitalite = () => {
  nodeList.vitalité.innerHTML =
    Math.floor(nodeList.force.innerHTML / 5) +
    Math.floor(nodeList.endurance.innerHTML / 5) +
    calculateIndice(nodeList.volonte.innerHTML);
};

export const setSangFroid = () => {
  nodeList.sangfroid.innerHTML =
    Math.floor(nodeList.volonte.innerHTML / 5) +
    Math.floor(nodeList.connaissances.innerHTML / 5) +
    calculateIndice(nodeList.combat.innerHTML);
};

export const setDestin = () => {
  if (race.innerHTML === "Humain" || race.innerHTML === "Halfelin") {
    nodeList.destin.innerHTML = 3;
  } else {
    nodeList.destin.innerHTML = 2;
  }
};
