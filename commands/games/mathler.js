const { MessageEmbed } = require('discord.js');
const { User, Mathler } = require("../../database/dbObject");

module.exports = {
    data: {
        name: 'www.mathler.com',
    },
    async execute(message, args, client) {
        const mathlerChannel = message.guild.channels.cache.get('962185931723505665');

        const senderId = message.author.id;

        const player = await User.findOne({ 
            where : { 
                id: senderId
            }
        });
        let mathler = await player.getMathler();
        let win = true;

        if(args[1] !== undefined){
            const today = new Date();
            const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const score = args[1][0];

            if(score === '1' || score === '2' || score === '3' || score === '4' || score === '5' || score === '6'){
                mathler.played++;
                mathler.lastWin = todayDate;
                mathler.previousWin = true;
                mathler.win++;
                
                if(mathler.previousWin){
                    mathler.winStreak++;
                    if(mathler.winStreak > mathler.winStreakRecord){
                        mathler.winStreakRecord = mathler.winStreak;
                    }
                }

                if(score === '1'){
                    mathler.t1++;
                } else if(score === '2'){
                    mathler.t2++;
                } else if(score === '3'){
                    mathler.t3++;
                } else if(score === '4'){
                    mathler.t4++;
                } else if(score === '5'){
                    mathler.t5++;
                } else if(score === '6'){
                    mathler.t6++;
                } 
            } else if(score.toLowerCase() === 'x'){ 
                mathler.played++;
                win = false;
                mathler.previousWin = false; 
                mathler.winStreak = 0;
            }

            Mathler.update(mathler.dataValues, { where: { id: mathler.id }});
        }

        const winRate = (mathler.win / mathler.played);

        const resultMessage = `
                Played: ${mathler.played}
                Total Win: ${mathler.win}
                Total Lose: ${mathler.played - mathler.win}
                Win Rate: ${(winRate * 100).toFixed(2)}%
                Win Streak: ${mathler.winStreak}
                Win Streak Record: ${mathler.winStreakRecord}
                Statistic:
                T1 - ${mathler.t1}
                T2 - ${mathler.t2}
                T3 - ${mathler.t3}
                T4 - ${mathler.t4}
                T5 - ${mathler.t5}
                T6 - ${mathler.t6}
            `

        const embedMessage = new MessageEmbed()
                .setTitle("MATHLER")
                .setDescription(resultMessage)
                .setFooter({ text: win ? "Good Job" : "Nice Try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM');
        
        await mathlerChannel.send({ embeds: [embedMessage] });
    },
}