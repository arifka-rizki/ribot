const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display user avatar')
        .addUserOption(option => option
            .setName("user")
            .setDescription("The avatar of user you want to see")),
    async execute(client, interaction) {
        const user = interaction.options.get('user');
        let ava;
        if (user) {
            ava = user.user.displayAvatarURL({ format: 'png', dynamic: true });
        } else{
            ava = interaction.user.displayAvatarURL({ format: 'png', dynamic: true });
        }
        await interaction.reply(ava);
    }
}