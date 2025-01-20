import { Constants } from "eris"

export default {
    data: {
        name: "poll",
        description: "Creates a poll",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: "question",
                description: "Question",
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true
            },
            {
                name: "choices",
                description: "Choices, seperate choices with semi-colons (max 5)",
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true
            },
            {
                name: "duration",
                description: "Duration the poll will stay up for (in hours)",
                type: Constants.ApplicationCommandOptionTypes.INTEGER
            },
            {
                name: "allow-answer-change",
                description: "Allow answer change",
                type: Constants.ApplicationCommandOptionTypes.BOOLEAN
            },
            {
                name: "allow-multiple-answers",
                description: "Allow multiple answers",
                type: Constants.ApplicationCommandOptionTypes.BOOLEAN
            }
        ]
    },
    run: async (bot, interaction) => {
        let options = interaction.data.options;

        function findOption(option) {
            return options.find(({ name }) => name === option)
        }

        let question = findOption('question');
        let choices = findOption('choices');
        let duration = findOption('duration');
        let allowMultipleAnswers = findOption('allow-multiple-answers');
        let allowAnswerChange= findOption('allow-answer-change');

        let channelID = (interaction.channel).id;

        bot.createMessage(channelID, {
            embed: {
                color: parseInt("93c7c5", 16),
                title: question.value,
                footer: {
                    text: `Up for ${duration.value} hours` //get current EST time and put it here to enable compare
                }
            },
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 1,
                            label: 'test',
                            custom_id: 'what'
                        }
                    ]
                }
            ]
        })

        interaction.createMessage({content: 'Poll created!', flags: Constants.MessageFlags.EPHEMERAL})
        console.log(interaction)

        //save interaction id as custom id + button identifier (mayeb number?) and then when press button use custom id and split it to get the interaction id to identify the specific poll and then update it
    }
}