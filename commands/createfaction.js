const { SlashCommandBuilder } = require("@discordjs/builders");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createfaction")
    .setDescription("Inserisci nel databasse la fazione che vuoi creare.")
    .addStringOption((option) =>
      option
        .setName("fazione")
        .setDescription("Inserisci il nome della fazione.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("colore")
        .setDescription("inserisci il colore del messaggio Embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("titolo")
        .setDescription("Inserisci il titolo del messaggio Embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("icona")
        .setDescription("Inserisci l'URL dell'icona del messaggio Embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("descrizione")
        .setDescription("Inserisci la descrizione del messaggio Embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("copertina")
        .setDescription(
          "Inserisci l'URL dell'immagine di copertina del messaggio Embed."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("testobottone")
        .setDescription("Inserisci il testo da mostrare sul bottone.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emojibottone")
        .setDescription(
          "Inserisci l'emoji da mostrare sul bottone affianco al testo."
        )
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("ruolo")
        .setDescription(
          "Specifica il ruolo da aggiungere quando viene premuto il bottone"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      //db
      await dbClient.connect();
      const database = dbClient.db("GFC");
      const fazioni = database.collection("db_fazioni");

      //const
      const authorId = interaction.user.id;
      const faction = interaction.options.get("fazione").value;
      const factionlabel = faction.toLowerCase().replace(" ", "");
      const color = interaction.options.get("colore").value;
      const title = interaction.options.get("titolo").value;
      const thumbnail = interaction.options.get("icona").value;
      const description = interaction.options.get("descrizione").value;
      const copertina = interaction.options.get("copertina").value;
      const buttonlabel = interaction.options.get("testobottone").value;
      const buttonemoji = interaction.options.get("emojibottone").value;
      const role = interaction.options.get("ruolo").value;

      const info = {
        authorId: authorId,
        factionlabel: factionlabel,
        faction: faction,
        color: color,
        title: title,
        thumbnail: thumbnail,
        description: description,
        copertina: copertina,
        buttonlabel: buttonlabel,
        buttonemoji: buttonemoji,
        role: role,
      };

      await fazioni.insertOne(info).then(() => {
        console.log(
          log.db + "Faction created " + info.faction + `(${factionlabel})`
        );
        console.log(info);
        const {
          updateFactionCommands,
        } = require("../handlers/updateFactionCommands");

        updateFactionCommands();
        const embedMessage = require("../discord/embedMessage");
        embedMessage.reply(interaction, "#ff0000", "Faction Created", "");
      });
    } catch (e) {
      console.log(log.error + "[createfaction.js/execute()] " + e);
    }
  },
};
