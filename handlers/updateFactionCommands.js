const { SlashCommandBuilder } = require("@discordjs/builders");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);

const fs = require("fs");

const updateFactionCommands = async () => {
  try {
    await dbClient.connect();
    const database = dbClient.db("GFC");
    const fazioni = database.collection("db_fazioni");
    global.choicesArray = [];
    global.commands = [];

    await fazioni
      .find()
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.choicesArray.push({
            name: record.faction,
            value: record._id.toHexString(),
          });
        }

        const senddata = new SlashCommandBuilder()
          .setName(`sendmessage`)
          .setDescription("Invia un messaggio Embed scegliendo la Fazione")
          .addStringOption((option) =>
            option
              .setName("sceglifazione")
              .setDescription(
                "Scegli la fazione per cui vuoi inviare il messaggio!"
              )
              .setRequired(true)
              .addChoices(...choicesArray)
          );

        const deletedata = new SlashCommandBuilder()
          .setName(`deletefaction`)
          .setDescription("Elimina una delle fazioni create.")
          .addStringOption((option) =>
            option
              .setName("sceglifazione")
              .setDescription("Scegli la fazione da eliminare.")
              .setRequired(true)
              .addChoices(...choicesArray)
          );

        const commandFiles = fs
          .readdirSync("./commands")
          .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
          let command = [];
          if (file == "sendmessage.js") {
            global.commands.push(senddata.toJSON());
          } else if (file == "deletefaction.js") {
            global.commands.push(deletedata.toJSON());
          } else {
            command = require(`../commands/${file}`);
            global.commands.push(command.data.toJSON());
          }
        }

        const { refresh } = require("./commandsRefresh");
        refresh();
      });
  } catch (e) {
    console.log(log.error + "[sendmessage/find()] " + e);
  }
};

module.exports = { updateFactionCommands };
