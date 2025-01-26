import { Constants } from "eris";
import { createCanvas, loadImage } from 'canvas';

export default {
    data: {
        name: "punish",
        description: "No! Bad!",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: "bad-person",
                description: "bad",
                type: Constants.ApplicationCommandOptionTypes.USER,
                required: true
            }
        ]
    },
    run: async (bot, interaction) => {
        let canvas = createCanvas(600,333);
        let ctx = canvas.getContext('2d');

        let user = (interaction.member.user).username;
        let punishedUser = ((((interaction.channel).guild).members).get(interaction.data.options[0].value)).user.username; //gets user ID from interaction returned value then uses that to sift through server member list to find user's username
        //in case of future implementation of user application command fetch username directly from discord API https://discord.com/api/v9/users/{id}, must include header with bot token

        loadImage("./ressources/cat.jpg").then((img) => {
            ctx.drawImage(img, 0, 0, 600, 337)

            ctx.fillStyle = '#000'
            ctx.font = 'bold 35px Verdana'
            ctx.textAlign = 'center'
            ctx.fillText(user, 120, 190)
            ctx.fillText(punishedUser, 390, 125)

            let attachment = canvas.toBuffer();
            interaction.createFollowup('', {name: 'cat.jpg', file: attachment})
        })
    }
}