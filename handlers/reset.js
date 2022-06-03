const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const reset = () => {
  try {
    const rest = new REST({ version: "9" }).setToken(token);
    rest.get(Routes.applicationCommands(clientId)).then((data) => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationCommands(clientId)}/${
          command.id
        }`;
        promises.push(rest.delete(deleteUrl));
      }

      console.log(log.system + "All commands removed.");
      return Promise.all(promises);
    });
  } catch (e) {
    console.log(log.error + "[reset.js/reset()] " + e);
  }
};

module.exports = { reset };
