import { Constants } from "eris"
import Uwuifier from "uwuifier";
const uwuifier = new Uwuifier({
    spaces: {
      faces: 0.4,
      actions: 0.075,
      stutters: 0.2,
    },
    words: 1,
    exclamations: 1,
  });;

export default {
    data: {
        name: "uwuify",
        description: "uwuify some text",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: "text",
                description: "text to uwuify",
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true
            }
        ]
    },
    run: async (bot, interaction) => {
        await interaction.createFollowup(uwuifier.uwuifySentence(interaction.data.options[0].value))
    }
}