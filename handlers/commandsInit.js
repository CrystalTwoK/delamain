const commandsInit = async (extCommands) => {
  try {
    const { updateFactionCommands } = require("./updateFactionCommands");
    updateFactionCommands();
  } catch (e) {
    console.log(log.error + "[commandsInit.js] " + e);
  }
};
module.exports = { commandsInit };
