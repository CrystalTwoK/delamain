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
        const role = interaction.channel.guild.roles.cache.get(result[0].role);
        console.log(role);
        interaction.member.roles.add(role);
      });
  } catch (e) {
    console.log(log.error + "[executeButton.js/executeButton()] " + e);
  }
};

//r

module.exports = { executeButton };
