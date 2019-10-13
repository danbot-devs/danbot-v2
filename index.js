//https://discordapp.com/oauth2/authorize?client_id=422433314347941896&scope=bot&permissions=2146958847

//Consts that make the bot work!
global.Discord = require("discord.js");
const client = new Discord.Client();
global.config = require("./config.js")
global.fs = require("fs");
global.moment = require("moment");
global.SQLite = require("better-sqlite3");
global.ms = require('ms');
global.request = require('request');
global.path = require("path");
global.ytdl = require('ytdl-core');
global.YouTube = require('simple-youtube-api');
const Enmap = require("enmap");
client.settings = new Enmap({name: "settings"});
require("./functions.js")(client);

global.bot = client;

//Music stuffs
client.youtube = new YouTube(config.GoogleAPIKey); // YouTube Client
client.queue = new Map() // Music Queue
client.votes = new Map(); // Vote Skip

//Event handler
fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
    const event = require(`./events/${f}`);
    client.on(f.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});


//Allow the bot to log into discord
client.login(config.token);