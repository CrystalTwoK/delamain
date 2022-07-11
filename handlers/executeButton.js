const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;

const executeButton = async (interaction) => {
  try {
    //db
    await dbClient.connect();
    const database = dbClient.db("GFC");
    const fazioni = database.collection("db_fazioni");
    const id = interaction.customId;

    const query = { _id: ObjectId(id) };

    await fazioni
      .find(query)
      .toArray()
      .then((result) => {
        const embedMessage = require("../discord/embedMessage");
        const role = interaction.channel.guild.roles.cache.get(result[0].role);
        if (interaction.member.roles.has(role)) {
          // interaction.member.roles.remove(role);
          embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai già questo ruolo",
            ""
          );
        } else {
          interaction.member.roles.add(role);
          embedMessage.reply(interaction, "#00ff00", "✅", "");
        }
      });
  } catch (e) {
    console.log(log.error + "[executeButton.js/executeButton()] " + e);
  }
};

//r

module.exports = { executeButton };
