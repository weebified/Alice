import { Constants } from "eris";
import { createCanvas, loadImage } from 'canvas';

export default {
    data: {
        name: "bonk",
        description: "Go to horny jail",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: "horny-user",
                description: "bonk",
                type: Constants.ApplicationCommandOptionTypes.USER,
                required: true
            }
        ]
    },
    run: async (bot, interaction) => {
        let canvas = createCanvas(600,333);
        let ctx = canvas.getContext('2d');

        let user = (interaction.member.user).username;
        let horniUser = ((((interaction.channel).guild).members).get(interaction.data.options[0].value)).user.username; //gets user ID from interaction returned value then uses that to sift through server member list to find user's username
        //in case of future implementation of user application command fetch username directly from discord API https://discord.com/api/v9/users/{id}, must include header with bot token

        loadImage("./ressources/bonk.png").then((img) => {
            ctx.drawImage(img, 0, 0, 600, 333)

            ctx.fillStyle = '#000'
            ctx.font = 'bold 35px Verdana'
            ctx.textAlign = 'center'
            ctx.fillText(user, 130, 230)
            ctx.fillText(horniUser, 475, 310)

            let attachment = canvas.toBuffer();
            interaction.createFollowup('', {name: 'bonk.png', file: attachment})
        })
    }
}