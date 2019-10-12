constconfig = {

    "ownerID": "BotOwner",
    "token": "BotToken",

    //API Keys
    "GoogleAPIKey": "GoogleAPIKey",

    //LOG Channels
    "consoleLogs": "ConsoleLogsChannelID",
    "startupLogs": "StartUpLogsChannelID",

    //Webhooks
    "webhook": {
        "ID": "WEBHOOKID",
        "secret": "WEBHOOKSECRET"
    },

    //Dashboard Settings
    "dashboard": {
        "oauthSecret": "OauthSecrethere",
        "callbackURL": "https://example.example/callback",
        "sessionSecret": "enterasecrethere",
        "domain": "https://example.example",
        "port": PORT
    },

    //Default settings
    "defaultSettings" : {
        "prefix": "DB!",
        "modonlycommands": "false",
        "serverLogs": "false",
        "modLogChannel": "mod-log",
        "modRole": "Moderator",
        "adminRole": "Administrator",
        "welcomeChannel": "welcome",
        "welcomeMessage": "Welcome {{user}} to {{guild}}! You are the {{amount}} user to join!",
        "welcomeEnabled": "false"
      },
};

module.exports = config;