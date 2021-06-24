const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'quote',
    description: 'Give you random inspirational quotes. By Quotable',
    alises: ['q'],
    async execute(message, arg) {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            const embedMessage = new Discord.MessageEmbed()
                .setDescription(`${data.content}`)
                .setFooter(`-${data.author}`)
                .setColor('GREEN');

            message.channel.send(embedMessage);
        } catch (error) {
            console.log(error);
            message.channel.send('An error occured');
        }

    }
}