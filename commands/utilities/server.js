const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Show server info'),
    async execute(client, interaction) {
        const embedMesssage = new MessageEmbed()
            .setTitle(interaction.guild.name)
            .setDescription(`**Total member**: ${interaction.guild.memberCount}\n**Created at**: ${interaction.guild.createdAt}\n**Owner**: ${userMention(interaction.guild.ownerId)}`)
            .setColor('GOLD');
        await interaction.reply({ embeds: [embedMesssage] });
    }
}