const nodeList = {};

export const getNode = (attribute) => {
  return document.querySelector(attribute);
};

export const newRow = (stats) => {
  const roll = rollDice(2, 10);
  stats.roll = roll;
  stats.total = roll.sum + stats.value;

  const tBodyPrimary = getNode("#tBodyPrimary");
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  const btn = document.createElement("button");

  td1.innerText = stats.name;
  td2.innerText = stats.abr;
  td3.innerText = stats.name !== "Magie" ? stats.value + roll.sum : stats.value;
  td3.setAttribute("id", stats.id);

  btn.className = "mdi mdi-dice-multiple-outline custom-icon";
  btn.setAttribute("id", "rerollBtn");
  btn.addEventListener("click", () => {
    resetRow(td3, stats);
    setSecondaryStats();
  });

  btn.style.backgroundColor = "white";
  btn.style.borderRadius = "6px";

  if (stats.id !== "magie") {
    td4.appendChild(btn);
    addTooltip(stats, td3, roll);
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tBodyPrimary.appendChild(tr);

  setItemStorage(stats.id, stats);
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

export const resetRow = (row, stats) => {
  const roll = rollDice(2, 10);
  stats.roll = roll;
  stats.total = roll.sum + stats.value;
  row.innerText = stats.total;

  setItemStorage(stats.id, stats);
  addTooltip(stats, row, roll);
};

export const addTooltip = (stats, node, roll) => {
  node.style.textDecoration = "underline dotted lightgrey 2px";
  node.style.fontWeight = "bold";
  node.setAttribute(
    "data-tooltip",
    `Score de base : ${stats.value}
      Résultat dé 1 : ${roll.dice[0]}
      Résultat dé 2 : ${roll.dice[1]}`
  );
  node.className = "has-tooltip-right";
};

function setNodeList() {
  // display race name
  nodeList.race = getNode("#race");

  // primary stats
  nodeList.combat = getNode("#combat");
  nodeList.connaissances = getNode("#connaissances");
  nodeList.discretion = getNode("#discretion");
  nodeList.endurance = getNode("#endurance");
  nodeList.force = getNode("#force");
  nodeList.habilite = getNode("#habilite");
  nodeList.magie = getNode("#magie");
  nodeList.mouvement = getNode("#mouvement");
  nodeList.perception = getNode("#perception");
  nodeList.sociabilite = getNode("#sociabilite");
  nodeList.survie = getNode("#survie");
  nodeList.tir = getNode("#tir");
  nodeList.volonte = getNode("#volonte");

  // secondary stats
  nodeList.initiative = getNode("#initiative");
  nodeList.vitalite = getNode("#vitalite");
  nodeList.sangfroid = getNode("#sangfroid");
  nodeList.destin = getNode("#destin");

  // other
  nodeList.printBtn = getNode("#printBtn");
  nodeList.displayArchetype = getNode("#displayArchetype");
  nodeList.archetypeImg = getNode("#archetypeImg");
  nodeList.archetypeName = getNode("#archetypeName");
  nodeList.archetypeDescription = getNode("#archetypeDescription");
}

export const setSecondaryStats = (special = []) => {
  setNodeList();

  const { stats } = special;

  stats?.forEach((stat) => {
    let newValue = +nodeList[stat.name].innerText;
    newValue += stat.value;
    nodeList[stat.name].innerText = newValue;
  });

  setInitiative();
  setVitalite();
  setSangFroid();
  setDestin();
};

export const calculateIndice = (number) => {
  return +String(number)[0];
};

export const setInitiative = (competence) => {
  const cmb = getItemStorage("combat");
  const mouv = getItemStorage("mouvement");
  const per = getItemStorage("perception");

  nodeList.initiative.innerText =
    calculateIndice(cmb.total) +
    calculateIndice(mouv.total) +
    calculateIndice(per.total);
};

export const setVitalite = (competence) => {
  const force = getItemStorage("force");
  const end = getItemStorage("endurance");
  const vol = getItemStorage("volonte");

  nodeList.vitalite.innerText =
    Math.floor(force.total / 5) +
    Math.floor(end.total / 5) +
    calculateIndice(vol.total);
};

export const setSangFroid = (competence) => {
  const cmb = getItemStorage("combat");
  const vol = getItemStorage("volonte");
  const con = getItemStorage("connaissances");

  nodeList.sangfroid.innerText =
    Math.floor(cmb.total / 5) +
    Math.floor(vol.total / 5) +
    calculateIndice(con.total);
};

export const setDestin = (competence) => {
  if (race.innerText === "Humain" || race.innerText === "Halfelin") {
    nodeList.destin.innerText = 3;
  } else {
    nodeList.destin.innerText = 2;
  }
};

export const setArchetype = (archetype) => {
  archetype.bonus.forEach((a) => {
    const key = Object.keys(a)[0];
    const statUpdated = a[key] > 0 ? "#4C8B55" : "red";

    nodeList[key].innerText = Number(nodeList[key].innerText) + a[key];
    nodeList[key].style.color = statUpdated;
  });

  archetype.random?.forEach((rand) => {
    const { sum } = rollDice(1, 2, true);
    const key = Object.keys(rand[sum])[0];

    const statUpdated = rand[sum][key] > 0 ? "#4C8B55" : "red";

    nodeList[key].innerText = Number(nodeList[key].innerText) + rand[sum][key];
    nodeList[key].style.color = statUpdated;
  });

  nodeList.printBtn.removeAttribute("disabled");
  nodeList.displayArchetype.setAttribute("hidden", "");

  disableRollButtons();
  setSecondaryStats();
  setImgArchetype(archetype);
};

const disableRollButtons = () => {
  const rerollBtn = document.querySelectorAll("#rerollBtn");
  rerollBtn.forEach((btn) => {
    btn.setAttribute("disabled", "");
  });
};

const setImgArchetype = (archetype) => {
  const { name, description } = archetype;
  const upperName = name[0].toUpperCase() + name.slice(1);

  nodeList.archetypeName.innerText = upperName;
  nodeList.archetypeDescription.innerText = description;
  nodeList.archetypeDescription.style.fontStyle = "italic";
  nodeList.archetypeImg.src = `./medias/archetypes/${name}.jpg`;
};

/**
 *
 * @param {String || Array} keys
 * @returns json object
 */
const getItemStorage = (keys) => {
  if (Array.isArray(keys)) {
    const output = [];

    keys.forEach((key) => {
      output.push(JSON.parse(localStorage.getItem(key)));
    });

    return output;
  }

  return JSON.parse(localStorage.getItem(keys));
};

const setItemStorage = (key, data) => {
  const stringifiedData = JSON.stringify(data);

  localStorage.setItem(key, stringifiedData);
};
