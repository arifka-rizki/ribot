const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Realtime weather information in your city')
        .addStringOption(option => option
            .setName('city')
            .setDescription('city you want to know the weather')
            .setRequired(true)),
    async execute(client, interaction) {
        const city = interaction.options.getString('city');
        try {
            let lat, lon;
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHERKEY}`);
            const data = await response.json();
            if (!data.length) {
                return interaction.reply('City not found');
            } else {
                lat = data[0].lat;
                lon = data[0].lon;
            }

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${process.env.WEATHERKEY}&units=metric`);
            const weatherData = await weatherResponse.json();

            const embedMessage = new MessageEmbed()
                .setTitle(`Weather on ${data[0].name}`)
                .setDescription(`**${weatherData.current.weather[0].main}**, ${weatherData.current.weather[0].description}`)
                .setThumbnail(`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`)
                .addField('Temperature', `${weatherData.current.temp}°C`, true)
                .addField('Humidity', `${weatherData.current.humidity}%`, true)
                .addField('Wind Speed', `${weatherData.current.wind_speed} Km/h`, true)
                .setColor('#82D4F5')
                .setTimestamp()

            await interaction.reply({ embeds: [embedMessage] });
        } catch (error) {
            console.log(error);
            await interaction.reply(`An error occured\n${error}`);
        }
    }
}