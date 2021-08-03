const Canvas = require('canvas');

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px Roboto Medium`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
}

module.exports = async (Discord, client, member) => {
    const channel = member.guild.channels.cache.get('852213233040621608');
    const welcomeRole = member.guild.roles.cache.get('856848545499578398');
    if (!channel) return;
    member.roles.add(welcomeRole);

    Canvas.registerFont('./resources/Roboto.ttf', { family: 'Roboto' });

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./resources/wallpaper.jpg');

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#74037b';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '28px Roboto Medium';
    context.fillStyle = '#ffffff';
    context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, member.displayName);
    context.fillStyle = '#ffffff';
    context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(``, attachment);
}