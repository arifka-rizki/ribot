module.exports = (Discord, client, message) => {
    const { prefix } = require('../../config.json');

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('This command can only used in server');
    }

    if (command.args === true && !args.length) {
        let reply = 'You need to insert argument for this command';

        if (command.usage) {
            reply += `\nWrong format! Use: '${prefix}${command.name} ${command.usage}'`;
        }

        return message.reply(reply);
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`No Spam! wait ${timeLeft} second(s) until you can use the ${command.name} command`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, Discord, client);
    } catch (error) {
        console.error(error);
        message.channel.send('There is an error executing that command');
    }
}