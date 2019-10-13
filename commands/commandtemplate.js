exports.run = (client, message, guild) => {
//Gets current time and date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

fs.writeFile(path.resolve(path.dirname(require.main.filename), "template.js"), `//You can use discord things here without using const Discord = require("discord.js");!\n \nexports.run = (client, message, guild) => {\n//Your stuff goes here... (DO NOT CHANGE ANY LINES ABOVE THIS OR THE BOT WILL NOT ACCEPT IT)\n}`, {options: "utf8"}, (err) => {
            if (err) {
                return message.channel.send("Failed! Please contact someone in the support server: https://discord.gg/r7bMr65" + err)
            }
            
            return setTimeout(() => { message.channel.send("Once you are finished use the `uploadcommand` to upload it to the guild commands!", { files: ["./template.js"] }) }, 500);
        })
setTimeout(() => {
fs.unlink(path.resolve(path.dirname(require.main.filename), "template.js"),function(err){
    if(err) return message.channel.send('__**ERROR**__ ' + err);
});
}, 1000);
};