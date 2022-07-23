const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Sends the bot ping",
    category: "",
    cooldown: 3,
    aliases: [],
    usage: [`ping `],
    example: [`ping `],
    botPerms: [],
    Permissions: [],
    owner: false,
      execute: async (message, args, client) => { 

        const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${client.emojis.ping_pong} Pong!\n${client.ws.ping}ms`)

        message.channel.send({embeds: [embed]})
    }
    
    
}

