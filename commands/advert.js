import { Constants } from "eris"

export default {
    data: {
        name: "advert",
        description: "advert for the dev lmao",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    run: async (bot, interaction) => {
        interaction.createFollowup({
            embed: {
                color: parseInt(process.env.ACCENT_COLOR, 16),
                title: "Thank you!",
                description: "Alice was made with :heart: by weebified",
                thumbnail: {url: `https://cdn.discordapp.com/avatars/${(bot.user).id}/${(bot.user).avatar}`}
            },
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 5,
                            url: "https://weebified.works/",
                            label: "Visit my website"
                        },
                        {
                            type: 2,
                            style: 5,
                            url: "https://ko-fi.com/weebified",
                            label: "Buy me a coffee"
                        }
                    ]
                }
            ]
        })
    }
}