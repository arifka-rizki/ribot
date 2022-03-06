const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Quiz time. Beat me if you can'),
    async execute(client, interaction) {
        await interaction.reply("On development");
        // try {
        //     const categories = [];
        //     const categoryResponse = await fetch('https://opentdb.com/api_category.php');
        //     const categoryData = await categoryResponse.json();

        //     categoryData.trivia_categories.forEach((item, index) => {
        //         categories.push(`${index + 1}. ${item.name}`);
        //     })

        //     const embedMessage = new Discord.MessageEmbed()
        //         .setColor('RANDOM')
        //         .setTitle('Quiz Category')
        //         .setDescription(`Choose category by insert the number\n${categories.join('\n')}`)
        //     message.channel.send(embedMessage);

        //     filter = msg => !msg.author.bot
        //     const category = await message.channel.awaitMessages(filter, { max: 1, error: ['time', 'max'] });
        //     const categoryId = categoryData.trivia_categories[parseInt(category.first().content)].id - 1;

        //     const quizResponse = await fetch(`https://opentdb.com/api.php?amount=1&category=${categoryId}&encode=url3986&type=multiple`);
        //     const quizData = await quizResponse.json();
        //     const quiz = decodeURIComponent(quizData.results[0].question);
        //     message.channel.send(quiz);
        //     const correctAnswer = decodeURIComponent(quizData.results[0].correct_answer);

        //     const answer = await message.channel.awaitMessages(filter, { max: 1, error: ['max'] });
        //     const ans = answer.first();

        //     if (ans.content.toLowerCase() === correctAnswer.toLowerCase()) {
        //         message.channel.send('You are right');
        //     } else {
        //         message.channel.send(`Wrong! The right answer is ${correctAnswer}`);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
}