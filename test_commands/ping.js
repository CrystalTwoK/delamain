const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test Command"),
  async execute(interaction) {
    var embed = new Discord.MessageEmbed().setTitle("Pong").setColor("#ffffff");
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
