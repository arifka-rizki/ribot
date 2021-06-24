const fs = require('fs');

module.exports = {
    name: 'reload',
    aliases: ['r'],
    description: 'Reload command (For development purpose)',
    args: true,
    usage: '[command name]',
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            message.reply(`There is no command with name or aliases '${commandName}'`);
        }

        const commandFolder = fs.readdirSync('./commands');
        const folderName = commandFolder.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command ${newCommand.name} was reloaded`);
        } catch (error) {
            console.log(error);
            message.channel.send(`An error occur reloading ${command.name}:\n'${error.message}'`);
        }
    }
}