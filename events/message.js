module.exports = async (client, message, guild, prefix) => { 
  const SQLite = require("sqlite");
  const sql = new SQLite('./SQL/msg.sqlite');
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
  if (message.author.bot) return;
  let score;
  if (message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0 }
    }
    score.points++;
  }
  client.setScore.run(score);


  if (message.author.bot) return;
  const settings = message.settings = client.getSettings(message.guild.id);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${settings.prefix}\``);
  }

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return message.channel.send('I don\'t work in direct messages, Sorry!')
          if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
          if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;

           if (settings.modonlycommands === "true") {
              if (!message.member.hasPermission("KICK_MEMBERS")) return;
              const prefix = settings.prefix;
              if (settings.prefix === undefined) return prefix = "DB!"
              if (message.content.indexOf(prefix) !== 0) return;
              const args = message.content.slice(prefix.length).trim().split(/ +/g);
              const commandargs = message.content.split(' ').slice(1).join(' ');
              const command = args.shift().toLowerCase();
              client.channels.get(config.consoleLogs).send(`[${message.guild.name}] [${message.author.username}] >> ${settings.prefix}${command} ${commandargs}`);
                  try {
                      let commandFile = require(`../commands/${command}.js`);
                      commandFile.run(client, message, args);
                  } catch (err) {
                      if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                          return;
                  } else
                  client.channels.get(config.consoleLogs).send(err)
                  }
            } else {
          const prefix = settings.prefix;
          if (settings.prefix === undefined) return prefix = "DB!"
          if (message.content.indexOf(prefix) !== 0) return;
          const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const commandargs = message.content.split(' ').slice(1).join(' ');
          const command = args.shift().toLowerCase();
          client.channels.get(config.commandLogs).send(`[${message.guild.name}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
              try {
                  let commandFile = require(`../commands/${command}.js`);
                  commandFile.run(client, message, args, Discord, fs, sql);
              } catch (err) {
                      if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                          return;
                  } else
                      client.channels.get(config.consoleLogs).send(err)
                  }
          } 
};