const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {

        if(!message.content.startsWith(PREFIX) || message.author.bot) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        command = client.commands.get(commandName);

        try {
            command.execute(message, args, client);
        } catch(error) {
            console.log(error);
            message.channel.send("there is error executing this command. Error:\n" + error.message);
        }

        
        // if(game === 'wordle' || game === 'katla' || game === 'nerdlegame' || game === 'mininerdlegame'){
        //     const result = inputScore(checkSender(senderId), game, parseInt(score[1][0]));

        //     const wordleChannel = message.guild.channels.cache.get('940100025659310160');
        //     const katlaChannel = message.guild.channels.cache.get('940100057338871839');
        //     const mininerdleChannel = message.guild.channels.cache.get('940161842624467006');
        //     const nerdleChannel = message.guild.channels.cache.get('940163686453104660');

            // const resultMessage = `
            //     Played: ${result.played}
            //     Total Win: ${result.countWin()}
            //     Total Lose: ${result.countLose()}
            //     Win Rate: ${result.countWinRate()}%
            //     Statistic:
            //     T1 - ${result.t1}
            //     T2 - ${result.t2}
            //     T3 - ${result.t3}
            //     T4 - ${result.t4}
            //     T5 - ${result.t5}
            //     T6 - ${result.t6}
            // `

            // const embedMessage = new MessageEmbed()
            //     .setTitle(game.toUpperCase())
            //     .setDescription(resultMessage)
            //     .setFooter({ text: "Nice try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
            //     .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
            //     .setColor('RANDOM')

        //     if(game === 'wordle') await wordleChannel.send({ embeds: [embedMessage] });
        //     else if(game === 'katla') await katlaChannel.send({ embeds: [embedMessage] });
        //     else if(game === 'nerdlegame') await nerdleChannel.send({ embeds: [embedMessage] });
        //     else if(game === 'mininerdlegame') await mininerdleChannel.send({ embeds: [embedMessage] });
        // }else return;
        
    }
}