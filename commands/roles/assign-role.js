module.exports = {
    name: 'assign-role',
    description: 'Make message that can give you role automatically by giving reaction',
    async execute(message, args, Discord, client) {
        const channel = '857103221024489523'
        const twitterRole = message.guild.roles.cache.find(role => role.name === 'Twitter');
        const youtubeRole = message.guild.roles.cache.find(role => role.name === 'Youtube');

        const twitterEmoji = '🐦';
        const youtubeEmoji = '▶️';

        const embedMessage = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Claim role to get notification')
            .setDescription(`${twitterEmoji} for twitter update notification\n${youtubeEmoji} for youtube update notification`);

        let messageEmbed = await message.channel.send(embedMessage);
        messageEmbed.react(twitterEmoji);
        messageEmbed.react(youtubeEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === twitterEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(twitterRole);
                }
                if (reaction.emoji.name === youtubeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(youtubeRole);
                }
            } else {
                return;
            }
        })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === twitterEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(twitterRole);
                }
                if (reaction.emoji.name === youtubeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(youtubeRole);
                }
            } else {
                return;
            }
        })

    }
}