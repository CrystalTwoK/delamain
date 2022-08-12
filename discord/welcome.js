const Canvas = require("canvas");
const Discord = require("discord.js");

const onJoin = async (member) => {
  var canvas = Canvas.createCanvas(1024, 500);

  ctx = canvas.getContext("2d");

  const images = [
    "https://cdn.discordapp.com/attachments/1006719258392281141/1007598795057528892/afterlife_banner_welcome_discord_2.png",
    "https://cdn.discordapp.com/attachments/1006719258392281141/1007598795401474108/afterlife_banner_welcome_discord_1.png",
  ];

  const selectedImage = Math.floor(Math.random() * images.length);

  var background = await Canvas.loadImage(images[selectedImage]);
  ctx.drawImage(background, 0, 0, 1000, 500);

  ctx.font = "bold 42px sans serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.username.toUpperCase(), 512, 410);

  ctx.beginPath();
  ctx.arc(512, 166, 119, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  var avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({
      format: "png",
      size: 1024,
    })
  );

  ctx.drawImage(avatar, 393, 47, 238, 238);

  var attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome.png"
  );

  client.channels.cache.get("1006732736213569598").send({
    content: `Ciao <@${member.id}>, benvenuto in **${member.guild.name}!**\nVisita il canale <#1006841079242428426> per confermare la tua identità!`,
    files: [attachment],
  });
};

const onLeave = (member) => {
  client.channels.cache
    .get("1007562652375068682")
    .send(`<@${member.id}> è uscito da ${member.guild.name}!`);
};

module.exports = { onJoin, onLeave };
