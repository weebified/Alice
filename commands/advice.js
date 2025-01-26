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
            interaction.createFollowup(advice.slip.advice)
        } else {
            interaction.createFollowup('There was an error')
        }

        //fetch("https://api.adviceslip.com/advice")
        //    .then((response) => response.json())
        //    .then((adviceJSON) => {
        //        interaction.createFollowup(adviceJSON.slip.advice);
        //    }) 
    }
}