const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('my-info')
        .setDescription('Your user info detail'),
    async execute(client, interaction) {
        const embedMessage = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(interaction.user.username)
            .setDescription(`**User ID**: ${interaction.user.id}\n**Joined Discord at**: ${interaction.user.createdAt}`)
            .setFooter({text: interaction.user.tag});
        await interaction.reply({ embeds: [embedMessage] })
    }
}