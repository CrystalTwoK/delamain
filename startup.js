const ready = async () => {
  try {
    const signature = [
      " ",
      "      88          88                              oo          ",
      ".d888b88 .d8888b. 88 .d8888b. 88d8b.d8b. .d8888b. dP 88d888b. ",
      "88'  `88 88ooood8 88 88'  `88 88'`88'`88 88'  `88 88 88'  `88 ",
      "88.  .88 88.  ... 88 88.  .88 88  88  88 88.  .88 88 88    88 ",
      "`88888P8 `88888P' dP `88888P8 dP  dP  dP `88888P8 dP dP    dP ",
      " ",
    ];

    for (const line of signature) {
      console.log(line);
    }
  } catch (e) {
    console.log(log.error + "[startup.js/ready()] " + e);
  }
};

module.exports = { ready };
