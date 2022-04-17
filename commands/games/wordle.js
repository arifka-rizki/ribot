const { MessageEmbed } = require('discord.js');
const { User, Wordle } = require("../../database/dbObject");

module.exports = {
    data: {
        name: 'wordle',
    },
    async execute(message, args, client) {
        const wordleChannel = message.guild.channels.cache.get('940100025659310160');

        const senderId = message.author.id;

        const player = await User.findOne({ 
            where : { 
                id: senderId
            }
        });
        let wordle = await player.getWordle();
        let win = true;

        if(args[1] !== undefined){
            const today = new Date();
            const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const score = args[1][0];

            if(score === '1' || score === '2' || score === '3' || score === '4' || score === '5' || score === '6'){
                wordle.played++;
                wordle.lastWin = todayDate;
                wordle.previousWin = true;
                wordle.win++;
                
                if(wordle.previousWin){
                    wordle.winStreak++;
                    if(wordle.winStreak > wordle.winStreakRecord){
                        wordle.winStreakRecord = wordle.winStreak;
                    }
                }

                if(score === '1'){
                    wordle.t1++;
                } else if(score === '2'){
                    wordle.t2++;
                } else if(score === '3'){
                    wordle.t3++;
                } else if(score === '4'){
                    wordle.t4++;
                } else if(score === '5'){
                    wordle.t5++;
                } else if(score === '6'){
                    wordle.t6++;
                } 
            } else if(score.toLowerCase() === 'x'){
                wordle.played++;
                win = false;
                wordle.previousWin = false; 
                wordle.winStreak = 0;
            }

            Wordle.update(wordle.dataValues, { where: { id: wordle.id }});
        }

        const winRate = (wordle.win / wordle.played);

        const resultMessage = `
                Played: ${wordle.played}
                Total Win: ${wordle.win}
                Total Lose: ${wordle.played - wordle.win}
                Win Rate: ${(winRate * 100).toFixed(2)}%
                Win Streak: ${wordle.winStreak}
                Win Streak Record: ${wordle.winStreakRecord}
                Statistic:
                T1 - ${wordle.t1}
                T2 - ${wordle.t2}
                T3 - ${wordle.t3}
                T4 - ${wordle.t4}
                T5 - ${wordle.t5}
                T6 - ${wordle.t6}
            `

        const embedMessage = new MessageEmbed()
                .setTitle("WORDLE")
                .setDescription(resultMessage)
                .setFooter({ text: win ? "Good Job" : "Nice Try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM');
        
        await wordleChannel.send({ embeds: [embedMessage] });
    },
}