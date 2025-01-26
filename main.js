import 'dotenv/config'
import { readdirSync } from "fs"

import Eris, { CommandInteraction, ComponentInteraction, Constants } from "eris" ;

const commands = [];

const bot = new Eris(process.env.TOKEN, {
    intents: [
        "guildMessages",
        "guilds",
        "guildMembers",
        "guildPresences",
        "messageContent"
    ],
    maxShards: "auto"
});

bot.on("ready", async () => {
    const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"))

    for (let element of commandFiles) {
        const slashCommandObject = await import(`./commands/${element}`)

        //await bot.createGuildCommand('767921479273807873', slashCommandObject.default.data)
        // Use code underneath for global slash commands
        //await bot.createCommand(slashCommandObject)
        commands.push({name: slashCommandObject.default.data.name, ephemeral: slashCommandObject.default.data.ephemeral, run: slashCommandObject.default.run})
    }

    console.log("Ready!")
})

bot.editStatus('online', [{name: 'Croquet', type: 0}])

bot.on("error", (err) => {
  console.error(err);
});

bot.on("interactionCreate", async (interaction) => {
    if(interaction instanceof CommandInteraction) { //Slash command interaction handling
        for(let slashCommand of commands) {
            if (slashCommand.name === interaction.data.name) {
                if (slashCommand.ephemeral == true) {
                    await interaction.acknowledge(Constants.MessageFlags.EPHEMERAL)
                } else {
                    await interaction.acknowledge()
                }
                await slashCommand.run(bot, interaction)
                break
            }
        }
    }
    
    if(interaction instanceof ComponentInteraction) { //Component interaction handling
        interaction.createMessage('worky')
        console.log(interaction.data)
    }
})

bot.connect();