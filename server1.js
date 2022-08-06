// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const Gamedig = require('gamedig');


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const gamedig = new Gamedig();


// When the client is ready, run this code (only once)
client.once('ready', () => {
	gamedig.query({
        socketTimeout: 2000,
        attemptTimeout: 10000,
        maxAttempts: 1,
        protocol: 'valve',
        type: 'hll',
        host: '51.161.132.69',
        port : '26662',
        debug: false
    }).then((state) => {
        client.user.setActivity(String(" on " + state.map + " - " + state.players.length + "/" + state.maxplayers), {type: "PLAYING"});
    }).catch((error) => {
       console.log(error);
    });
});

setInterval(function() {
    getServerInfo();
  }, 60000);

function getServerInfo(){
    gamedig.query({
        type: 'hll',
        host: '51.161.132.69',
        port : '26662'
    }).then((state) => {
        client.user.setActivity(String(" on " + state.map + " - " +state.players.length + "/" + state.maxplayers), {type: "PLAYING"});
    }).catch((error) => {
        console.log(error);
    });
}

// Login to Discord with your client's token
client.login(token);

