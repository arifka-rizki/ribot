const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Call me, I dare you'),
    async execute(client, interaction) {
        const data = [];
        data.push("Hi, I'm Ribot your friendly hood Discord Bot")
        data.push(`Made with ❤️ by Wienie#2469`)

        const embedMassage = new MessageEmbed()
            .setTitle('Ribot')
            .setDescription("Hi, I'm Ribot your friendly hood Discord Bot\nMade with ❤️ by Wienie#2469")
            .setFooter({ text: "Using Discord.js", iconURL: 'https://i.imgur.com/wSTFkRM.png'})
            .setURL('https://github.com/arifka-rizki/ribot')
            .setColor('DARK_GOLD')
            .setThumbnail('https://cdn.discordapp.com/avatars/852200224256294992/7a24e369f6829a2e45e58bdad1217b25.png')

        await interaction.reply({ embeds: [embedMassage] });
    }
}