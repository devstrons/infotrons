const { MessageEmbed, Client, CommandInteraction, Message } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Sends the ping!',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${client.emojis.ping_pong} Pong!\n${client.ws.ping}ms`)

        interaction.reply({embeds: [embed]})
    },
};