module.exports = async (client, message, guild) => { 


  if (message.author.bot) return;
  global.settings = message.settings = client.getSettings(message.guild.id);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${settings.prefix}\``);
  }

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return message.channel.send('I don\'t work in direct messages, Sorry!')
          if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
          if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;

          const prefix = settings.prefix;
          if (settings.prefix === undefined) return prefix = "DB!"
          if (message.content.indexOf(prefix) !== 0) return;
          const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const commandargs = message.content.split(' ').slice(1).join(' ');
          const command = args.shift().toLowerCase();
          client.channels.get(config.consoleLogs).send(`[${message.guild.name} (${message.guild.id})] [${message.author.username} (${message.author.id})] >> ${settings.prefix}${command} ${commandargs}`);
              try {
                  let commandFile = require(`../commands/${command}.js`);
                  commandFile.run(client, message, args);
              } catch (err) {
                      if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                          return;
                  } else
                      client.channels.get(config.consoleLogs).send(err)
                  } 
          
                      try {
                          let commandFile = require(`../guildcommands/` + message.guild.id + `/${command}.js`);
                              commandFile.run(client, message, args);
                      } catch (err) {
                              if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                                  return;
                          }
                          }
          
};