const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Server info detail',
    guildOnly: true,
    execute(message, args) {
        const embedMesssage = new Discord.MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(`**Total member**: ${message.guild.memberCount}\n**Created at**: ${message.guild.createdAt}\n**Owner**: ${message.guild.owner}`)
            .setColor('GOLD');
        message.channel.send(embedMesssage);
    }
}