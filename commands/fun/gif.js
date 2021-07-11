const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config()

module.exports = {
    name: 'gif',
    description: 'Send random gif based on keyword',
    usage: '[keyword]',
    args: true,
    async execute(message, args,) {
        try {
            const response = await fetch(`https://g.tenor.com/v1/search?key=${process.env.TENORKEY}&q=${args.join(' ')}&limit=20`);
            const data = await response.json();
            if (data.length) {
                return message.channel.send(`Sorry, I don't have ${args} gif collection`);
            } else {
                const index = Math.floor(Math.random() * 20);
                const gifURL = data.results[index].media[0].gif.url;
                message.channel.send(gifURL);
            }
        } catch (error) {
            console.log(error);
            message.channel.send(`An error occured\n${error}`);
        }
    }
}