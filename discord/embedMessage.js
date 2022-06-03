const { MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;

module.exports = {
  async faction(interaction) {
    try {
      //db
      await dbClient.connect();
      const database = dbClient.db("GFC");
      const fazioni = database.collection("db_fazioni");
      const id = interaction.options.get("sceglifazione").value;
      const query = { _id: ObjectId(id) };

      await fazioni
        .find(query)
        .toArray()
        .then((results) => {
          const result = results[0];

          const embed = new Discord.MessageEmbed()
            .setColor(result.color)
            .setTitle(result.title)
            .setDescription(result.description)
            .setThumbnail(result.thumbnail)
            .setImage(result.copertina)
            .setTimestamp()
            .setFooter({
              text: `© 2022 - Delamain - ${result.faction}`,
            });

          const button = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId(result._id.toString())
              .setLabel(result.buttonlabel)
              .setEmoji(result.buttonemoji)
              .setStyle("SECONDARY")
          );

          interaction.channel.send({ embeds: [embed], components: [button] });
        });
    } catch (e) {
      console.log(log.error + "[embedMessage/embedMessage()] " + e);
    }
  },
  async reply(interaction, color, title, description) {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter({
          text: `© 2022 - Delamain - System`,
        });

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (e) {
      console.log(log.error + "[embedMessage/reply()] " + e);
    }
  },
};
