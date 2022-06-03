module.exports = {
  async execute(interaction) {
    try {
      const embedMessage = require("../discord/embedMessage");
      embedMessage.faction(interaction);
    } catch (e) {
      console.log(log.error + "[sendmessage/execute()] " + e);
    }
  },
};
