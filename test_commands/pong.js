const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("Test Command [pong]"),
  async execute(interaction) {
    const scelta = interaction.options.get("scelta").value;
    var embed = new Discord.MessageEmbed()
      .setTitle("Ping" + scelta)
      .setColor("#ffffff");
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
