import { Constants } from "eris"

export default {
    data: {
        name: "advice",
        description: "Returns random advice",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    run: async (bot, interaction) => {
        let advice

        try {
            let response = await fetch("https://api.adviceslip.com/advice");
            advice = await response.json();
        } catch (err) {
            console.error(err)
        }

        if (advice || advice?.ok) {
            interaction.createMessage(advice.slip.advice)
        } else {
            interaction.createMessage('There was an error')
        }

        //fetch("https://api.adviceslip.com/advice")
        //    .then((response) => response.json())
        //    .then((adviceJSON) => {
        //        interaction.createMessage(adviceJSON.slip.advice);
        //    }) 
    }
}