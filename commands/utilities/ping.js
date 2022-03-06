const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check ping-pong'),
    async execute(client, interaction) {
        await interaction.deferReply();
        const sent = await interaction.editReply({ content: 'pinging...', fetchReply: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        
        let color;

        if (ping < 100) {
            color = "GREEN"
        } else if (ping >= 100 & ping < 200) {
            color = "YELLOW"
        } else {
            color = "RED"
        }

        const embedMessage = new MessageEmbed()
            .setColor(color)
            .setDescription(`:hourglass: ${ping}ms\n💓: ${client.ws.ping}ms`);

        interaction.editReply({content: ':ping_pong: pong', embeds: [embedMessage]})
    },
}