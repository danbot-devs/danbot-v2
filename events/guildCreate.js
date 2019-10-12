const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
const webhook = config.webhook;

module.exports = async (client, guild, files) => {
    let link = await bot.generateInvite(["ADMINISTRATOR"])
    console.log(timestamp + ` Joined ${guild.name}(${guild.id}), ${guild.memberCount} members!, Guild Owner:${guild.owner}(${guild.ownerID})`);

    const hookchannel = new Discord.WebhookClient(webhook.ID, webhook.secret);

    //Embed
    let embed = new Discord.RichEmbed();
    embed.setTitle(':large_blue_circle: New server join');
    embed.setDescription(`Server Owner: ${guild.owner} (${guild.owner.id})`);
    embed.addField("Name", guild.name, true);
    embed.addField("ID", guild.id, true).setColor("BLUE");
    embed.addField(`Members (${guild.memberCount})`, `<:wumpus:623877491437600779> ${guild.members.filter(member => !member.user.bot).size} <:bots:623871824413065227> ${guild.members.filter(member => member.user.bot).size} | <:online:623866611727728640> ${guild.members.filter(m => m.presence.status === 'online').size + guild.members.filter(m => m.presence.status === 'idle').size} <:dnd:623868861535617025> ${guild.members.filter(m => m.presence.status === 'dnd').size} <:oflline:623866682502414356> ${guild.members.filter(m => m.presence.status === 'offline').size}`, true);
    embed.addField("Channel Info", `📁 ${guild.channels.filter(c => c.type === "category").size} <:text:623887638901817377> ${guild.channels.filter(c => c.type === 'text').size} <:voice:623887642139951104> ${guild.channels.filter(c => c.type === 'voice').size}`, true);
    embed.addField("Invite Danbot:", `[Click Here!](${link})`)
    hookchannel.send(embed);

}