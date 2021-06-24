const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    aliases: ['command', 'h'],
    description: 'List of command that I can do',
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`You can send '${prefix}help [command name]' to get info on specific command!`);
            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

        if (!command) {
            return message.channel.send('I don\'t have that command');
        }

        data.push(`**Name**: ${command.name}`);
        if (command.aliases) data.push(`**Aliases**: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description**: ${command.description}`);
        if (command.usage) data.push(`**Usage**: ${prefix}${command.name} ${command.usage}`);
        data.push(`**Cooldown**: ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    }
}