import { Constants } from "eris"

export default {
    data: {
        name: "fact",
        description: "Returns a random fact",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    run: async (bot, interaction) => {
        let fact

        try {
            let response = await fetch("https://useless.dotenv.dev/api/random");
            fact = await response.json();
        } catch (err) {
            console.error(err)
        }

        if (fact || fact?.ok) {
            interaction.createFollowup(fact.fact)
        } else {
            interaction.createFollowup('There was an error')
        }

        //fetch("https://useless.dotenv.dev/api/random")
        //    .then((response) => response.json())
        //    .then((factJSON) => {
        //        interaction.createFollowup(factJSON.fact);
        //    }) 
    }
}