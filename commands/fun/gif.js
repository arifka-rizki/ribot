const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Send random gif based on keyword')
        .addStringOption( option => option
            .setName('keyword')
            .setDescription('gif you want to send')
            .setRequired(true)),
    async execute(client, interaction) {
        const keyword = interaction.options.getString('keyword');
        try {
            const response = await fetch(`https://g.tenor.com/v1/search?key=${process.env.TENORKEY}&q=${keyword}&limit=20`);
            const data = await response.json();
            if (data.length) {
                await interaction.reply(`Sorry, I don't have ${keyword} gif collection`);
            } else {
                const index = Math.floor(Math.random() * 20);
                const gifURL = data.results[index].media[0].gif.url;
                await interaction.reply(gifURL);
            }
        } catch (error) {
            console.log(error);
            await interaction.reply(`An error occured\n${error}`);
        }
    }
}