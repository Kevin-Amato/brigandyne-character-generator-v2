export const getNode = (attribute) => {
  return document.querySelector(attribute);
};

export default {
  // display race name
  race: getNode("#race"),

  // primary stats
  get cmb() {
    return getNode("#cmb");
  },
  get cns() {
    return getNode("#cns");
  },
  get dis() {
    return getNode("#dis");
  },
  get end() {
    return getNode("#end");
  },
  get for() {
    return getNode("#for");
  },
  get hab() {
    return getNode("#hab");
  },
  get mag() {
    return getNode("#mag");
  },
  get mou() {
    return getNode("#mou");
  },
  get per() {
    return getNode("#per");
  },
  get soc() {
    return getNode("#soc");
  },
  get sur() {
    return getNode("#sur");
  },
  get tir() {
    return getNode("#tir");
  },
  get vol() {
    return getNode("#vol");
  },

  // secondary stats
  initiative: getNode("#initiative"),
  vitalite: getNode("#vitalité"),
  sangfroid: getNode("#sangfroid"),
  destin: getNode("#destin"),

  // other
  tBodyPrimary: getNode("#tBodyPrimary"),
  generateButton: getNode(".button"),
  printBtn: getNode("#printBtn"),
  displayArchetype: getNode("#displayArchetype"),
  archetypeImg: getNode("#archetypeImg"),
  selectedArchetype: getNode("#selectedArchetype"),
  archetypeName: getNode("#archetypeName"),
  archetypeDescription: getNode("#archetypeDescription"),
  lockArchetype: getNode("#lockArchetype"),
};
