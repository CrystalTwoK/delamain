const commandsInit = async () => {
  try {
    const { updateFactionCommands } = require("./updateFactionCommands");
    updateFactionCommands();
  } catch (e) {
    console.log(log.error + "[commandsInit.js/commandsInit()] " + e);
  }
};
module.exports = { commandsInit };
