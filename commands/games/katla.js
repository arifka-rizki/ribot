const { MessageEmbed } = require('discord.js');
const { User, Katla } = require("../../database/dbObject");

module.exports = {
    data: {
        name: 'katla',
    },
    async execute(message, args, client) {
        const katlaChannel = message.guild.channels.cache.get('940100057338871839');

        const senderId = message.author.id;

        const player = await User.findOne({ 
            where : { 
                id: senderId
            }
        });
        let katla = await player.getKatla();
        let win = true;

        if(args[1] !== undefined){

            const today = new Date();
            const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const score = args[1][0];

            if(score === '1' || score === '2' || score === '3' || score === '4' || score === '5' || score === '6'){
                katla.played++;
                katla.lastWin = todayDate;
                katla.previousWin = true;
                katla.win++;
                
                if(katla.previousWin){
                    katla.winStreak++;
                    if(katla.winStreak > katla.winStreakRecord){
                        katla.winStreakRecord = katla.winStreak;
                    }
                }

                if(score === '1'){
                    katla.t1++;
                } else if(score === '2'){
                    katla.t2++;
                } else if(score === '3'){
                    katla.t3++;
                } else if(score === '4'){
                    katla.t4++;
                } else if(score === '5'){
                    katla.t5++;
                } else if(score === '6'){
                    katla.t6++;
                } 
            } else if(score.toLowerCase() === 'x'){
                katla.played++;
                win = false;
                katla.previousWin = false; 
                katla.winStreak = 0;
            }

            Katla.update(katla.dataValues, { where: { id: katla.id }});
        }

        const winRate = (katla.win / katla.played);

        const resultMessage = `
                Played: ${katla.played}
                Total Win: ${katla.win}
                Total Lose: ${katla.played - katla.win}
                Win Rate: ${(winRate * 100).toFixed(2)}%
                Win Streak: ${katla.winStreak}
                Win Streak Record: ${katla.winStreakRecord}
                Statistic:
                T1 - ${katla.t1}
                T2 - ${katla.t2}
                T3 - ${katla.t3}
                T4 - ${katla.t4}
                T5 - ${katla.t5}
                T6 - ${katla.t6}
            `

        const embedMessage = new MessageEmbed()
                .setTitle("KATLA")
                .setDescription(resultMessage)
                .setFooter({ text: win ? "Good Job" : "Nice Try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM');
        
        await katlaChannel.send({ embeds: [embedMessage] });
    },
}