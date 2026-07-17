const MOD_COLOR = "#00bcd4";

export const getNode = (selector) => {
  return document.querySelector(selector);
};

const positionTooltip = (host, box) => {
  const hostRect = host.getBoundingClientRect();
  const tooltipHeight = box.offsetHeight || 150;
  const spaceAbove = hostRect.top;
  const spaceBelow = window.innerHeight - hostRect.bottom;

  if (spaceAbove < tooltipHeight + 20 && spaceBelow > spaceAbove) {
    box.style.top = `calc(100% + 10px)`;
    box.style.bottom = "auto";
    box.classList.add("tooltip-bottom");
  } else {
    box.style.top = "auto";
    box.style.bottom = `calc(100% + 10px)`;
    box.classList.remove("tooltip-bottom");
  }
};

export const newRow = (stats, isLowest = false, raceMods = {}, archetypeMods = {}) => {
  const roll = rollDice(2, 10);
  stats.roll = roll;
  stats.total = roll.sum + stats.value;

  const tBodyPrimary = getNode("#tBodyPrimary");
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  td1.innerText = stats.name;
  td2.innerText = stats.abr;
  td3.setAttribute("id", stats.id);

  const tooltipHost = document.createElement("span");
  tooltipHost.className = "tooltip-host";

  const valueSpan = document.createElement("span");
  valueSpan.className = "stat-value";
  valueSpan.innerText = stats.name !== "Magie" ? stats.value + roll.sum : stats.value;
  if (raceMods && raceMods[stats.id]) {
    valueSpan.style.color = MOD_COLOR;
  }
  tooltipHost.appendChild(valueSpan);

  const tooltipBox = document.createElement("span");
  tooltipBox.className = "tooltip-box";
  tooltipHost.appendChild(tooltipBox);

  td3.appendChild(tooltipHost);

  tooltipHost.addEventListener("mouseenter", () => {
    requestAnimationFrame(() => positionTooltip(tooltipHost, tooltipBox));
  });

  if (isLowest && stats.id !== "magie") {
    const btn = document.createElement("button");
    btn.className = "mdi mdi-dice-multiple-outline custom-icon reroll-btn";
    btn.addEventListener("click", () => {
      rerollRow(td3, stats);
    });
    btn.style.backgroundColor = "white";
    btn.style.borderRadius = "6px";
    td4.appendChild(btn);
    tr.classList.add("lowest-stat");
  }

  addTooltip(stats, tooltipBox, roll, raceMods, archetypeMods);

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

export const rerollRow = (row, stats) => {
  const previousTotal = stats.total;
  const previousRoll = stats.roll;

  const roll = rollDice(2, 10);
  stats.roll = roll;
  stats.total = roll.sum + stats.value;

  const bestTotal = Math.max(previousTotal, stats.total);

  const valueSpan = row.querySelector(".stat-value");
  if (valueSpan) valueSpan.innerText = bestTotal;

  stats.total = bestTotal;

  setItemStorage(stats.id, stats);

  const tooltipBox = row.querySelector(".tooltip-box");
  if (tooltipBox) {
    addTooltip(stats, tooltipBox, roll, stats.raceMods, stats.archetypeMods, previousRoll, previousTotal);
  }

  disableAllRollButtons();
};

export const addTooltip = (stats, tooltipBox, roll, raceMods = {}, archetypeMods = {}, previousRoll = null, previousTotal = null) => {
  const formatMod = (mods, label) => {
    const entries = Object.entries(mods).filter(([, v]) => v !== 0);
    if (!entries.length) return "";
    const lines = entries.map(([key, value]) => {
      const sign = value > 0 ? "+" : "";
      const color = value > 0 ? "#4C8B55" : "red";
      return `${key} : <span style="color:${color}">${sign}${value}</span>`;
    }).join("<br>");
    return `${label} :<br>${lines}`;
  };

  const raceSection = formatMod(raceMods, "Peuple");
  const archetypeSection = formatMod(archetypeMods, "Archetype");
  const sections = [raceSection, archetypeSection].filter(Boolean).join("<br><br>");

  let html = `Score de base : ${stats.value}<br>`;
  html += `Résultat dé 1 : ${roll.dice[0]}<br>`;
  html += `Résultat dé 2 : ${roll.dice[1]}`;

  if (sections) {
    html += `<br><br>--- Modificateurs ---<br>${sections}`;
  }

  if (previousRoll) {
    html += `<br><br>--- Relance ---<br>`;
    html += `Ancien résultat dé 1 : ${previousRoll.dice[0]}<br>`;
    html += `Ancien résultat dé 2 : ${previousRoll.dice[1]}<br>`;
    html += `Ancien total : ${previousTotal}<br>`;
    html += `Meilleur total conservé : ${stats.total}`;
  }

  tooltipBox.innerHTML = html;
};

export const setSecondaryStats = (special = []) => {
  const { stats } = special;

  stats?.forEach((stat) => {
    const node = getNode(`#${stat.name}`);
    if (node) {
      let newValue = +node.innerText;
      newValue += stat.value;
      node.innerText = newValue;
    }
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
  const cmb = getItemStorage("combat");
  const mouv = getItemStorage("mouvement");
  const per = getItemStorage("perception");

  getNode("#initiative").innerText =
    calculateIndice(cmb.total) +
    calculateIndice(mouv.total) +
    calculateIndice(per.total);
};

export const setVitalite = () => {
  const force = getItemStorage("force");
  const end = getItemStorage("endurance");
  const vol = getItemStorage("volonte");

  getNode("#vitalite").innerText =
    Math.floor(force.total / 5) +
    Math.floor(end.total / 5) +
    calculateIndice(vol.total);
};

export const setSangFroid = () => {
  const cmb = getItemStorage("combat");
  const vol = getItemStorage("volonte");
  const con = getItemStorage("connaissances");

  getNode("#sangfroid").innerText =
    Math.floor(cmb.total / 5) +
    Math.floor(vol.total / 5) +
    calculateIndice(con.total);
};

export const setDestin = () => {
  const destinNode = getNode("#destin");
  const race = getNode("#race")?.innerText || "";

  if (race === "Humain" || race === "Halfelin") {
    destinNode.innerText = 3;
  } else {
    destinNode.innerText = 2;
  }
};

export const setArchetype = (archetype, stats = []) => {
  const printBtn = getNode("#printBtn");
  const displayArchetype = getNode("#displayArchetype");

  stats.forEach((stat) => {
    stat.archetypeMods = {};
  });

  archetype.bonus.forEach((a) => {
    const key = Object.keys(a)[0];
    const value = a[key];
    const statUpdated = MOD_COLOR;

    const stat = stats.find((s) => s.id === key);
    if (stat) {
      stat.archetypeMods[key] = (stat.archetypeMods[key] || 0) + value;
    }

    const node = getNode(`#${key}`);
    if (node) {
      const valueSpan = node.querySelector(".stat-value");
      if (valueSpan) {
        valueSpan.innerText = Number(valueSpan.innerText) + value;
        valueSpan.style.color = statUpdated;
      }
    }
  });

  archetype.random?.forEach((rand) => {
    const { sum } = rollDice(1, 2, true);
    const key = Object.keys(rand[sum])[0];
    const value = rand[sum][key];
    const statUpdated = MOD_COLOR;

    const stat = stats.find((s) => s.id === key);
    if (stat) {
      stat.archetypeMods[key] = (stat.archetypeMods[key] || 0) + value;
    }

    const node = getNode(`#${key}`);
    if (node) {
      const valueSpan = node.querySelector(".stat-value");
      if (valueSpan) {
        valueSpan.innerText = Number(valueSpan.innerText) + value;
        valueSpan.style.color = statUpdated;
      }
    }
  });

  stats.forEach((stat) => {
    const node = getNode(`#${stat.id}`);
    if (node && stat.roll) {
      const tooltipBox = node.querySelector(".tooltip-box");
      if (tooltipBox) {
        addTooltip(stat, tooltipBox, stat.roll, stat.raceMods, stat.archetypeMods);
      }
    }
  });

  printBtn?.removeAttribute("disabled");
  displayArchetype?.setAttribute("hidden", "");

  disableAllRollButtons();
  setSecondaryStats();
  setImgArchetype(archetype);
};

export const disableAllRollButtons = () => {
  const rerollBtns = document.querySelectorAll(".reroll-btn");
  rerollBtns.forEach((btn) => {
    btn.setAttribute("disabled", "");
    btn.style.display = "none";
  });
};

const setImgArchetype = (archetype) => {
  const { name, description } = archetype;
  const upperName = name[0].toUpperCase() + name.slice(1);

  const archetypeName = getNode("#archetypeName");
  const archetypeDescription = getNode("#archetypeDescription");
  const archetypeImg = getNode("#archetypeImg");

  if (archetypeName) archetypeName.innerText = upperName;
  if (archetypeDescription) {
    archetypeDescription.innerText = description;
    archetypeDescription.style.fontStyle = "italic";
  }
  if (archetypeImg) archetypeImg.src = `./medias/archetypes/${name}.jpg`;
};

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

const getItemStorage = (keys) => {
  try {
    if (Array.isArray(keys)) {
      const output = [];
      keys.forEach((key) => {
        const item = localStorage.getItem(key);
        output.push(item ? JSON.parse(item) : null);
      });
      return output;
    }
    const item = localStorage.getItem(keys);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const setItemStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
};

export const findLowestStat = (statsList) => {
  let lowest = statsList[0];
  statsList.forEach((stat) => {
    if (stat.id !== "magie" && stat.total < lowest.total) {
      lowest = stat;
    }
  });
  return lowest.id;
};
