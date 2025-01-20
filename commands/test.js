import { Constants } from "eris"

export default {
    data: {
        name: "uwu",
        description: "uwu? uwu!",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    run: async (bot, interaction) => {
        await interaction.createMessage("uwu!")
    }
}