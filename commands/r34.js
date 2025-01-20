import { Constants } from "eris"

export default {
    data: {
        name: "rule34",
        description: "Search rule34.xxx (follows rule34.xxx search syntax, leave empty for random)",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: "tags",
                description: "Tags",
                type: Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    },
    run: async (bot, interaction) => {
        console.log('received')

        if (interaction.channel.nsfw) {
            let imgs;
            let value;
            let tags;
            let error;

            if (interaction.data.hasOwnProperty('options')) {
                value = interaction.data.options[0].value;
                tags = value.replace(' ', '+');
            } else {
                tags = '';
            }

            try {
                let response = await fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=37&tags=-ai_generated+${tags}`); //fuck ai art
                imgs = await response.json();
            } catch (err) {
                console.error(err)
                if (err.message === 'Unexpected end of JSON input') {
                    interaction.createMessage({
                        embed: {
                            color: parseInt("ED4245", 16),
                            title: "No results!",
                            description: `This command uses rule34.xxx syntax to search for results.\n\nUse **spaces** to seperate tags and **"_"** as spaces within search terms, you can also use **"-"** before a tag to omit results with a tag!\n\nHere's an example:\`/rule34 tags: search_term -second_serch_term\``,
                        }
                    })
                }
                error = err.message;
            }

            if (imgs || imgs?.ok) {
                let rng;

                if (imgs.length < 36) {
                    rng = Math.round(Math.random() * (imgs.length - 1));
                } else {
                    rng = Math.round(Math.random() * 36);
                }
                
                let img = await imgs[rng];
                let desc;

                let imgTags
                
                if ((img.tags).length >= 250) {
                    imgTags = `${(img.tags).slice(0, 250)}...`;
                } else {
                    imgTags = img.tags;
                }

                if (img.image.endsWith('.mp4')) {
                    desc = 'This is a video'
                }

                interaction.createMessage({
                    embed: {
                        color: parseInt("93c7c5", 16),
                        title: "Link to rule34 page",
                        url: `https://rule34.xxx/index.php?page=post&s=view&id=${img.id}`,
                        description: desc,
                        image: {
                            url: img.sample_url
                        },
                        footer: {
                            text: imgTags
                        }
                    }
                })
            } else if(error !== 'Unexpected end of JSON input'){
                interaction.createMessage('There was an error')
            }
        } else {
            interaction.createMessage({content: "Idiot!! This channel isn't marked as NSFW! You can't use this here!", flags: Constants.MessageFlags.EPHEMERAL})
        }
    }
}