module.exports = (client) => {
    client.getSettings = (guild) => {
      const defaults = config.defaultSettings || {};
      if (!guild) return defaults;
      const guildData = client.settings.get(guild) || {};
      const returnObject = {};
      Object.keys(defaults).forEach((key) => {
        returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
      });
      return returnObject;
    };
    client.clean = async (client, text) => {
      if (text && text.constructor.name == "Promise")
        text = await text;
      if (typeof evaled !== "string")
        text = require("util").inspect(text, {depth: 1});
  
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(client.token, "Error: No such file.");
  
      return text;
    };
  };