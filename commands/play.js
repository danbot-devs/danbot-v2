exports.run = async (message, args, client) => {

    let VC = message.member.voiceChannel;
    if (!VC) return [message.delete(), message.channel.send(`${message.author}, please join a voice channel! ` + `${settings.prefix}play <music/url>`)];

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return [message.delete(), message.channel.send(`${message.author}, please enter a music name or url! ` + `${settings.prefix}play <music/url>`)];

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return [message.delete(), message.channel.send(`${message.author}, I do not have permissions to connect to voice channels! ` +`${settings.prefix}play <music/url>`)];
    if (!perms.has('SPEAK')) return [message.delete(), message.channel.send(`${message.author}, I do not have permissions to speak in a voice channel ` + `${settings.prefix}play <music/url>`)];

    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return message.channel.send(`**${playlist.title}** has been added to queue.`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var vid = await bot.youtube.searchVideos(searchString, 1);
                var video = await bot.youtube.getVideoByID(vid[0].id);
            } catch (err) {
                console.error(err);
                return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, no videos can be found with the argument \`${searchString}\``, `${config.prefix}play <music/url>`), 5000)];
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};