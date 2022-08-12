const { SlashCommandBuilder } = require("@discordjs/builders");
const { onJoin } = require("../discord/welcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("provajoin")
    .setDescription("Prova il Join del server."),

  async execute(interaction) {
    try {
      onJoin(interaction.member);
    } catch (e) {
      console.log(log.error + "[provajoin/execute()] " + e);
    }
  },
};
