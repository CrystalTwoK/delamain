/*
      88          88                              oo          
.d888b88 .d8888b. 88 .d8888b. 88d8b.d8b. .d8888b. dP 88d888b. 
88'  `88 88ooood8 88 88'  `88 88'`88'`88 88'  `88 88 88'  `88 
88.  .88 88.  ... 88 88.  .88 88  88  88 88.  .88 88 88    88 
  `88888P8 `88888P' dP `88888P8 dP  dP  dP `88888P8 dP dP    dP 

Author: Andrea Marucci
*/
require("dotenv").config();
require("colors");
const MongoClient = require("mongodb").MongoClient;
const Discord = require("discord.js");

global.client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_VOICE_STATES",
  ],
});

global.token = process.env.token;
global.db = process.env.db;
global.clientId = process.env.clientid;
global.commands = [];
global.choicesArray = [];
global.log = {
  default: "[DELAMAIN]".green,
  system: `${"[DELAMAIN]".green} ${"SYSTEM".blue} ${">>> ".red}`,
  db: `${"[DELAMAIN]".green} ${"DATABASE".green} ${">>> ".red} `,
  error: `${"[DELAMAIN]".green} ${"ERROR".red} ${">>> ".red} `,
};
client.login(token);

client.on("ready", async () => {
  const { ready } = require("./startup");
  const reset = false;
  console.clear();
  await ready();
  if (!reset) {
    const { commandsInit } = require("./handlers/commandsInit");
    await commandsInit();
    MongoClient.connect(db, (err, db) => {
      if (err) console.log(log.error + err);
      console.log(log.db + "Database Connection Enstablished");
    });
  } else {
    const { reset } = require("./handlers/reset");
    await reset();
  }
});

client.on("interactionCreate", (interaction) => {
  const { execute } = require("./handlers/execute");
  const { executeButton } = require("./handlers/executeButton");
  const { isAdmin } = require("./discord/isAdmin");
  if (isAdmin) {
    if (interaction.isCommand()) {
      execute(interaction);
    } else if (interaction.isButton()) {
      executeButton(interaction);
    } else {
      return;
    }
  }
});
