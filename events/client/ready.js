module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        client.user.setActivity('Hard');
        console.log(`${client.user.tag} is now online`);
    }
}