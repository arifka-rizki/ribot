module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args, Discord, client) {
        message.channel.send('Pinging').then(async msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            let color;

            if (ping < 100) {
                color = "GREEN"
            } else if (ping >= 100 & ping < 200) {
                color = "YELLOW"
            } else {
                color = "RED"
            }

            const embedMessage = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`:hourglass: ${ping}ms`);

            msg.edit(':ping_pong: pong');
            msg.edit(embedMessage);
        });
    },
}