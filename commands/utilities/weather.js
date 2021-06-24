const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config()

module.exports = {
    name: 'weather',
    description: 'Realtime weather information in your city',
    alises: ['w'],
    args: true,
    async execute(message, args, Discord) {
        city = querystring.stringify({ q: args.join(' ') });
        try {
            let lat, lon;
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?${city}&limit=1&appid=${process.env.WEATHERKEY}`);
            const data = await response.json();
            if (!data.length) {
                return message.channel.send('City not found');
            } else {
                lat = data[0].lat;
                lon = data[0].lon;
            }

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${process.env.WEATHERKEY}&units=metric`);
            const weatherData = await weatherResponse.json();

            const embedMessage = new Discord.MessageEmbed()
                .setTitle(`Weather on ${data[0].name}`)
                .setDescription(`**${weatherData.current.weather[0].main}**, ${weatherData.current.weather[0].description}`)
                .setThumbnail(`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`)
                .addField('Temperature', `${weatherData.current.temp}°C`, true)
                .addField('Humidity', `${weatherData.current.humidity}%`, true)
                .addField('Wind Speed', `${weatherData.current.wind_speed} Km/h`, true)
                .setColor('#82D4F5')
                .setTimestamp()

            message.channel.send(embedMessage);
        } catch (error) {
            console.log(error);
            return message.channel.send(`An error occured\n${error}`);
        }
    }
}