const isAdmin = (userInteraction) => {
  return userInteraction.member
    .permissionsIn(userInteraction.channel)
    .has("ADMINISTRATOR");
};

module.exports = { isAdmin };
