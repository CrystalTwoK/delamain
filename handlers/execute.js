const fs = require("fs");

const execute = (interaction) => {
  try {
    let file = fs
      .readdirSync("commands")
      .filter((file) => file.startsWith(interaction.commandName));
    const command = require(`../commands/${file}`);
    command.execute(interaction);
  } catch (e) {
    console.log(log.error + "[execute.js/execute()] " + e);
  }
};

module.exports = { execute };
