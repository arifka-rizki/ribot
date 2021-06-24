module.exports = (Discord, client, member) => {
    const channel = member.guild.channels.cache.get('852213233040621608');
    const welcomeRole = member.guild.roles.cache.get('856848545499578398');

    member.roles.add(welcomeRole);
    channel.send(`Welcome to the server ${member}`);
}