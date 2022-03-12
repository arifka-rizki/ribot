const { checkSender, inputScore } = require("../../data/game.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if(message.type !== 'DEFAULT') return;
        const score = message.content.trim().split(/ +/);
        const game = score.shift().toLowerCase();
        const senderId = message.author.id;
        
        if(game === 'wordle' || game === 'katla' || game === 'nerdlegame' || game === 'mininerdlegame'){
            const result = inputScore(checkSender(senderId), game, parseInt(score[1][0]));

            const wordleChannel = message.guild.channels.cache.get('940100025659310160');
            const katlaChannel = message.guild.channels.cache.get('940100057338871839');
            const mininerdleChannel = message.guild.channels.cache.get('940161842624467006');
            const nerdleChannel = message.guild.channels.cache.get('940163686453104660');

            const resultMessage = `
                Played: ${result.played}
                Total Win: ${result.countWin()}
                Total Lose: ${result.countLose()}
                Win Rate: ${result.countWinRate()}%
                Statistic:
                T1 - ${result.t1}
                T2 - ${result.t2}
                T3 - ${result.t3}
                T4 - ${result.t4}
                T5 - ${result.t5}
                T6 - ${result.t6}
            `

            const embedMessage = new MessageEmbed()
                .setTitle(game.toUpperCase())
                .setDescription(resultMessage)
                .setFooter({ text: "Nice try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM')

            if(game === 'wordle') await wordleChannel.send({ embeds: [embedMessage] });
            else if(game === 'katla') await katlaChannel.send({ embeds: [embedMessage] });
            else if(game === 'nerdlegame') await nerdleChannel.send({ embeds: [embedMessage] });
            else if(game === 'mininerdlegame') await mininerdleChannel.send({ embeds: [embedMessage] });
        }else return;
        
    }
}