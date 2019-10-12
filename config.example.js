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
};

module.exports = config;