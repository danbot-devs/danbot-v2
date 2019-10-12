const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
const webhook = config.webhook;

module.exports = async (client, guild, files) => {
    let gowner = bot.users.find(u => u.id == guild.ownerID)
    let link = await client.generateInvite(["ADMINISTRATOR"])
    console.log(timestamp + ` Joined ${guild.name}(${guild.id}), ${guild.memberCount} members!, Guild Owner:${gowner.username}(${guild.ownerID})`);

    const hookchannel = new Discord.WebhookClient(webhook.ID, webhook.secret);

    //Embed
    let embed = new Discord.RichEmbed();
    embed.setTitle(':large_blue_circle: New server join');
    embed.setDescription(`Server Owner: ${gowner.username} (${guild.owner})`);
    embed.addField("Name", guild.name, true);
    embed.addField("ID", guild.id, true).setColor("BLUE");
    embed.addField(`Members (${guild.memberCount})`, `<:wumpus:632647233870757889> ${guild.members.filter(member => !member.user.bot).size} <:bots:632647233296400385> ${guild.members.filter(member => member.user.bot).size} | <:online:632647233119977519>   ${guild.members.filter(m => m.presence.status === 'online').size + guild.members.filter(m => m.presence.status === 'idle').size} <:DnD:632647233346600970> ${guild.members.filter(m => m.presence.status === 'dnd').size} <:offline:632647233384480798> ${guild.members.filter(m => m.presence.status === 'offline').size}`, true);
    embed.addField("Channel Info", `📁 ${guild.channels.filter(c => c.type === "category").size} <:text:632647233178697739> ${guild.channels.filter(c => c.type === 'text').size} <:voice:632647233749123103> ${guild.channels.filter(c => c.type === 'voice').size}`, true);
    embed.addField("Invite Danbot:", `[Click Here!](${link})`, true)
    hookchannel.send(embed);

}