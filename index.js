//https://discordapp.com/oauth2/authorize?client_id=422433314347941896&scope=bot&permissions=2146958847

//Consts that make the bot work!
global.Discord = require("discord.js");
const client = Discord.Client();
const bot = client
global.fs = require("fs");
global.moment = require("moment");
global.SQLite = require("sqlite3")
global.ms = require('ms')
global.request = require('request')



client.on('ready', () => {
  
  //Event handler
  fs.readdir('./events/', (err, files) => {
      files = files.filter(f => f.endsWith('.js'));
      files.forEach(f => {
          const event = require(`./events/${f}`);
          client.on(f.split('.')[0], event.bind(null, client));
          delete require.cache[require.resolve(`./events/${f}`)];
        });
      });
  
  //Command handler


})

client.on('message', async message => {

})


//Allow the bot to log into discord
client.login(config.token);