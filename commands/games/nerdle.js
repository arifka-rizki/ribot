const { MessageEmbed } = require('discord.js');
const { User, Nerdle } = require("../../database/dbObject");

module.exports = {
    data: {
        name: 'nerdlegame',
    },
    async execute(message, args, client) {
        const nerdleChannel = message.guild.channels.cache.get('940163686453104660');

        const senderId = message.author.id;

        const player = await User.findOne({ 
            where : { 
                id: senderId
            }
        });
        let nerdle = await player.getNerdle();
        let win = true;

        if(args[1] !== undefined){

            const today = new Date();
            const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const score = args[1][0];

            if(score === '1' || score === '2' || score === '3' || score === '4' || score === '5' || score === '6'){
                nerdle.played++;
                nerdle.lastWin = todayDate;
                nerdle.previousWin = true;
                nerdle.win++;

                if(nerdle.previousWin){
                    nerdle.winStreak++;
                    if(nerdle.winStreak > nerdle.winStreakRecord){
                        nerdle.winStreakRecord = nerdle.winStreak;
                    }
                }

                if(score === '1'){
                    nerdle.t1++;
                } else if(score === '2'){
                    nerdle.t2++;
                } else if(score === '3'){
                    nerdle.t3++;
                } else if(score === '4'){
                    nerdle.t4++;
                } else if(score === '5'){
                    nerdle.t5++;
                } else if(score === '6'){
                    nerdle.t6++;
                } 
            } else if(score.toLowerCase() === 'x'){ 
                nerdle.played++;
                win = false;
                nerdle.previousWin = false; 
                nerdle.winStreak = 0;
            }

            Nerdle.update(nerdle.dataValues, { where: { id: nerdle.id }});
        }

        const winRate = (nerdle.win / nerdle.played);

        const resultMessage = `
                Played: ${nerdle.played}
                Total Win: ${nerdle.win}
                Total Lose: ${nerdle.played - nerdle.win}
                Win Rate: ${(winRate * 100).toFixed(2)}%
                Win Streak: ${nerdle.winStreak}
                Win Streak Record: ${nerdle.winStreakRecord}
                Statistic:
                T1 - ${nerdle.t1}
                T2 - ${nerdle.t2}
                T3 - ${nerdle.t3}
                T4 - ${nerdle.t4}
                T5 - ${nerdle.t5}
                T6 - ${nerdle.t6}
            `

        const embedMessage = new MessageEmbed()
                .setTitle("NERDLE")
                .setDescription(resultMessage)
                .setFooter({ text: win ? "Good Job" : "Nice Try", iconURL: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png'})
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setColor('RANDOM');
        
        await nerdleChannel.send({ embeds: [embedMessage] });
    },
}