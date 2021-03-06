// require the native file system of node
require('dotenv').config();
const fs = require('fs');
// Require the necessary discord.js classes
const { Client,Collection, Intents, MessageActionRow, MessageButton } = require('discord.js');
//const { token } = require('./config.json'); 
const key = process.env.api_key;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//retrieveing events
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if(event.once){
		client.once(event.name,(...args) => event.execute(...args));
	}else{
		client.on(event.name,(...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return; 
 
	try {
		await command.execute(interaction);	
	} catch (error) {
		console.error(error);
		await interaction.reply({content:'There was an error while excecuting this command!',ephemeral:true});
	}
		
	
});

// Login to Discord with your client's token
console.log(key);
client.login(key);