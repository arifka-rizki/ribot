const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Give you random inspirational quotes. By Quotable'),
    async execute(client, interaction) {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            const embedMessage = new MessageEmbed()
                .setDescription(`${data.content}`)
                .setFooter({text: `-${data.author}`})
                .setColor('GREEN');

            await interaction.reply({ embeds: [embedMessage] });
        } catch (error) {
            console.log(error);
            await interaction.reply(`An error occured\n${error}`);
        }

    }
}