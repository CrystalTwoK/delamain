const isAdmin = (interaction) => {
  return interaction.member
    .permissionsIn(interaction.channel)
    .has("ADMINISTRATOR");
};

module.exports = { isAdmin };
