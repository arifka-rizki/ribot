const { MessageEmbed } = require('discord.js');
const { User, Mini } = require("../../database/dbObject");

module.exports = {
    data: {
        name: 'mininerdlegame',
    },
    async execute(message, args, client) {
        const miniChannel = message.guild.channels.cache.get('940161842624467006');

        const senderId = message.author.id;

        const player = await User.findOne({ 
            where : { 
                id: senderId
            }
        });
        let mini = await player.getMini();
        let win = true;

        if(args[1] !== undefined){
            const today = new Date();
            const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const score = args[1][0];

            if(score === '1' || score === '2' || score === '3' || score === '4' || score === '5' || score === '6'){
                mini.played++;
                mini.lastWin = todayDate;
                mini.previousWin = true;
                mini.win++;

                if(mini.previousWin){
                    mini.winStreak++;
                    if(mini.winStreak > mini.winStreakRecord){
                        mini.winStreakRecord = mini.winStreak;
                    }
                }

                if(score === '1'){
                    mini.t1++;
                } else if(score === '2'){
                    mini.t2++;
                } else if(score === '3'){
                    mini.t3++;
                } else if(score === '4'){
                    mini.t4++;
                } else if(score === '5'){
                    mini.t5++;
                } else if(score === '6'){
                    mini.t6++;
                } 
            } else if(score.toLowerCase() === 'x'){   
                mini.played++;
                win = false;
                mini.previousWin = false; 
                mini.winStreak = 0;
            }

            Mini.update(mini.dataValues, { where: { id: mini.id }});
        } 

        const winRate = (mini.win / mini.played);

        const resultMessage = `
                Played: ${mini.played}
                Total Win: ${mini.win}
                Total Lose: ${mini.played - mini.win}
                Win Rate: ${(winRate * 100).toFixed(2)}%
                Win Streak: ${mini.winStreak}
                Win Streak Record: ${mini.winStreakRecord}
                Statistic:
                T1 - ${mini.t1}
                T2 - ${mini.t2}
                T3 - ${mini.t3}
                T4 - ${mini.t4}
                T5 - ${mini.t5}
                T6 - ${mini.t6}
            `

        const embedMessage = new MessageEmbed()
                .setTitle("MINI NERDLE")
                .setDescription(resultMessage)
                .setFooter({ text: win ? "Good Job" : "Nice Try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM');
        
        await miniChannel.send({ embeds: [embedMessage] });
    },
}