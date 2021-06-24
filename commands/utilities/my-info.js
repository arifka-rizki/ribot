const Discord = require('discord.js');

module.exports = {
    name: 'my-info',
    description: 'User info detail',
    execute(message, args) {
        const embedMessage = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.author.username)
            .setDescription(`**User ID**: ${message.author.id}\n**Joined Discord at**: ${message.author.createdAt}`)
            .setFooter(message.author.tag);
        message.channel.send(embedMessage);
    }
}