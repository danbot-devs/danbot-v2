const getSize = require('get-folder-size');
module.exports = async (client, guild, files) => {
    //Guild commands
    setInterval(() => {
        client.guilds.forEach((guild) => {
            if (!fs.existsSync("./guildcommands/" + guild.id)){
                fs.mkdirSync("./guildcommands/" + guild.id);
            }
        });
        }, 10000);
        
      //Message Leaderboard SQL Tables
  const sql = new SQLite('./SQL/msg.sqlite');
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
  }

    client.user.setActivity("LOADING STATUS.........");
    let link = await client.generateInvite([2146958847]);
    //Ready Console Message
    const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    console.log(`Started ${client.user.username} at ${timestamp}!\nuse this link to invite the bot: ${link}`);
    fs.readdir("./commands/", (err, files) => {
        if (err) return console.log(err);
        getSize("./", (err, size) => {
            let startEmbed = new Discord.RichEmbed()
                .setTitle(`${client.user.username} Started!`)
                .setColor("#53f23e")
                .addField("__**Time:**__", timestamp, true)
                .addField("__**Total Members:**__", client.guilds.reduce((p, c) => p + c.memberCount, 0), true)
                .addField("__**Total Channels:**__", client.channels.size, true)
                .addField("__**Total Guilds:**__", `${client.guilds.size}`, true)
                .addField("__**Commands:**__", files.length, true)
                .addField("__**Directory Size:**__", ((size / 1024 / 1024).toFixed(2) + ' MB'), true)
                .addField("What are you waiting for:", `[Click here](${link}) to invite the bot!`)
            client.channels.find(c => c.id == config.startupLogs).send(startEmbed);
        })
    })

    //Command Handler
    fs.readdir("./commands/", (err, files) => {
        if (err) return client.channels.find(c => c.id == config.startupLogs).send(err);
        client.channels.find(c => c.id == config.startupLogs).send(`Loaded ${files.length} commands successfully!`)
    })

    //Auto Activities List
    setInterval(() => {
        const activities = [{
                "text": `over ${client.guilds.reduce((p, c) => p + c.memberCount, 0)} members`,
                "type": "WATCHING"
            },
            {
                "text": "with commands in " + client.guilds.size + " guilds",
                "type": "PLAYING"
            }
        ];
        client.user.setStatus('online')
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 10000);


}