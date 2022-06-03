const { SlashCommandBuilder } = require("@discordjs/builders");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;
const { updateFactionCommands } = require("../handlers/updateFactionCommands");

module.exports = {
  async execute(interaction) {
    try {
      await dbClient.connect();
      const database = dbClient.db("GFC");
      const fazioni = database.collection("db_fazioni");
      const id = interaction.options.get("sceglifazione").value;
      const query = { _id: ObjectId(id) };

      fazioni.deleteOne(query, (e, obj) => {
        if (e)
          console.log(
            log.error + "[deletefaction.js/execute()/fazioni/deleteOne()] " + e
          );

        updateFactionCommands();
        const embedMessage = require("../discord/embedMessage");
        embedMessage.reply(interaction, "#ffea00", "Faction Deleted", "");
      });
    } catch (e) {
      console.log(log.error + "[deletefaction/execute()] " + e);
    }
  },
};
