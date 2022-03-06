const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENTID, GUILDID, TOKEN } = require('./config.json');

const commands = []
const commandFolder = fs.readdirSync('./commands');

for(const folder of commandFolder){
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for(const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({version: '9'}).setToken(TOKEN);
(async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: commands });
		console.log('Successfully deploy commands.');
    } catch (error) {
		console.log(error);
	}
})();