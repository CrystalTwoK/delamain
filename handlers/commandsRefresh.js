const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const refresh = async () => {
  const rest = new REST({ version: "9" }).setToken(token);

  (async () => {
    try {
      console.log(log.system + "Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: global.commands,
      });

      console.log(
        log.system + "Successfully reloaded application (/) commands."
      );
    } catch (e) {
      console.log(log.error + "[commandsRefresh] " + e);
    }
  })();
};

module.exports = { refresh };
