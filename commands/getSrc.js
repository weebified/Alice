import { Constants } from "eris"

export default {
    data: {
        name: "get",
        description: "gets a ressource from Discord",
        ephemeral: true,
        options: [
            {
                name: "emote",
                description: "get an emote",
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                options: [
                    {
                        name: "emotes",
                        description: "name or the emote(s)",
                        type: Constants.ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            },
            {
                name: "role",
                description: "get a role's properties",
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
                options: [
                    {
                        name: "icon",
                        description: "get a role's icon",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "role",
                                description: "role to get icon from",
                                type: Constants.ApplicationCommandOptionTypes.ROLE,
                                required: true
                            }
                        ]
                    },
                    {
                        name: "color",
                        description: "get a role's color",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "role",
                                description: "role to get color from",
                                type: Constants.ApplicationCommandOptionTypes.ROLE,
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "profile-banner",
                description: "gets banners from profile",
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
                options: [
                    {
                        name: "default",
                        description: "gets user's default profile banner",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "user",
                                description: "user to get banner from",
                                type: Constants.ApplicationCommandOptionTypes.USER,
                                required: true
                            }
                        ]
                    },
                    {
                        name: "server",
                        description: "gets user's server profile banner",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "user",
                                description: "user to get banner from",
                                type: Constants.ApplicationCommandOptionTypes.USER,
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "profile-icon",
                description: "gets icons from profile",
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
                options: [
                    {
                        name: "default",
                        description: "gets user's default profile icon",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "user",
                                description: "user to get icon from",
                                type: Constants.ApplicationCommandOptionTypes.USER,
                                required: true
                            }
                        ]
                    },
                    {
                        name: "server",
                        description: "gets user's server profile icon",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        options: [
                            {
                                name: "user",
                                description: "user to get icon from",
                                type: Constants.ApplicationCommandOptionTypes.USER,
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "server",
                description: "gets ressources from server",
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
                options: [
                    {
                        name: "banner",
                        description: "gets server's banner",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    },
                    {
                        name: "icon",
                        description: "gets server's icon",
                        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    }
                ]
            }
        ]
    },
    run: async (bot, interaction) => {
        let type = await interaction.data.options[0].name;
        let secondType = await interaction.data.options[0].options[0].name;
        let value;
        let msgContent = {content: 'There was an error'};

        if (type === 'emote') { // get emote
            value = interaction.data.options[0].options[0].value;
            let valueArray = value.replaceAll(/<|>|\s/g, '').slice('1').split(':');
            let cdnList;
            let ids = [];
            let names = [];
            let cdns = [];

            for (let i = 0; i < valueArray.length; i++) {
                if (i & 1) {
                    ids.push(valueArray[i]);
                } else {
                    names.push(valueArray[i]);
                }
            }

            for (let i = 0; i < ids.length; i++) {
                cdns.push(`[${names[i]}](https://cdn.discordapp.com/emojis/${ids[i]}.png)`)
            }

            cdnList = cdns.join('\n')
            
            if (valueArray.length < 3) {
                msgContent.content = 'Here is your emote image!\n\n' + cdnList;
            } else {
                msgContent.content = 'Here are your emote images!\n\n' + cdnList;
            }
        } else if (type === 'role') { //get role
            let roleId = await interaction.data.options[0].options[0].options[0].value;
            let roleName = await ((((interaction.member).guild).roles).get(roleId)).name;

            if (secondType === 'color') {
                let color = await (((((interaction.member).guild).roles).get(roleId)).color).toString(16);

                msgContent.content = `Here is the color of the role "${roleName}": ${color}`
            } else {
                let icon = await (((interaction.member).guild).roles).get(roleId).icon

                if (icon === null) {
                    msgContent.content = 'This role has no icon'
                } else {
                    let iconURL = (((interaction.member).guild).roles).get(roleId).iconURL;

                    msgContent.content = `Here is the icon for the role "${roleName}": ${iconURL}`
                }
            }
        } else if (type === 'profile-banner' || type === 'profile-icon') { //get profile ressources
            let userId = await interaction.data.options[0].options[0].options[0].value;
            let srcUrl;
            let msg = 'Uh oh! There was a problem..'
            let accentColor = process.env.ACCENT_COLOR;

            if (secondType === 'server') {
                let guildId = await ((interaction.channel).guild).id;
                let userObj;

                try {
                    let response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${process.env.TOKEN}`
                        }
                    });
                    userObj = await response.json();
                } catch (err) {
                    console.error(err)
                }

                if (type === 'profile-banner' && userObj.banner !== null && (userObj || userObj?.ok)) {
                    srcUrl = `https://cdn.discordapp.com/banners/guilds/${guildId}/users/${userId}/banners/${userObj.banner}.png`;
                    msg = `Here is ${userObj.nick}'s server profile banner!`;
                } else if (type === 'profile-icon' && userObj.avatar !== null && (userObj || userObj?.ok)) {
                    srcUrl = `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${userObj.avatar}.png`;
                    msg = `Here is ${userObj.nick}'s server profile picture!`;
                } else if (type === 'profile-banner' && userObj.banner === null && (userObj || userObj?.ok)) {
                    msg = "What do you want me to do!? This person doesn't have a server profile banner!";
                } else if (type === 'profile-icon' && userObj.avatar === null && (userObj || userObj?.ok)) {
                    msg = "What do you want me to do!? This person doesn't have a server profile picture!";
                }
            }

            if (secondType === 'default') {
                let userObj;

                try {
                    let response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${process.env.TOKEN}`
                        }
                    });
                    userObj = await response.json();
                } catch (err) {
                    console.error(err)
                }
                
                if (type === 'profile-banner' && userObj.banner !== null && (userObj || userObj?.ok)) {
                    srcUrl = `https://cdn.discordapp.com/banners/${userId}/${userObj.banner}.png`;
                    msg = `Here is ${userObj.username}'s profile banner!`;
                } else if (type === 'profile-icon' && userObj.avatar !== null && (userObj || userObj?.ok)) {
                    srcUrl = `https://cdn.discordapp.com/avatars/${userId}/${userObj.avatar}.png`;
                    msg = `Here is ${userObj.username}'s profile picture!`;
                } else if (userObj.banner === null && userObj.banner_color !== null) {
                    msg = `Hmm.. this person doesn't have a banner set. So here's their banner color instead!\n\n${userObj.banner_color}`;
                    color = userObj.banner_color;
                } else if (userObj.avatar === null) {
                    msg = "This person doesn't have a profile picture set!";
                } else if (userObj.banner === null && userObj.banner_color === null) {
                    msg = "What? This person didn't change anything about their banner! So boring!";
                }
            }
            
            msgContent = {
                embed: {
                    color: parseInt(accentColor, 16),
                    title: msg,
                    image: {
                        url: srcUrl
                    },
                }
            }

        } else if (type === 'server') { //gets server ressources
            let guildId = await ((interaction.channel).guild).id;
            let guildObj;
            let msg;
            let imgUrl;

            try {
                let response = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bot ${process.env.TOKEN}`
                    }
                });
                guildObj = await response.json();
            } catch (err) {
                console.error(err)
            }

            if (secondType === 'banner' && guildObj.banner !== null && (guildObj || guildObj?.ok)) {
                imgUrl = `https://cdn.discordapp.com/banners/${guildId}/${guildObj.banner}.png`;
                msg = `Here is ${guildObj.name}'s server banner!`;
            } else if (secondType === 'icon' && guildObj.icon !== null && (guildObj || guildObj?.ok)) {
                imgUrl = `https://cdn.discordapp.com/icons/${guildId}/${guildObj.icon}.png`;
                msg = `Here is ${guildObj.name}'s server icon!`;
            } else if (secondType === 'banner' && guildObj.banner === null && (guildObj || guildObj?.ok)) {
                msg = `This server doesn't have a banner!`;
            } else if (secondType === 'icon' && guildObj.icon === null && (guildObj || guildObj?.ok)) {
                msg = `This server doesn't have an icon!`;
            }

            msgContent = {
                embed: {
                    color: parseInt(process.env.ACCENT_COLOR, 16),
                    title: msg,
                    image: {
                        url: imgUrl
                    },
                }
            }
        }

        await interaction.createFollowup(msgContent)
    }
}