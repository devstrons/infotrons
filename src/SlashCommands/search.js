const { MessageEmbed, Client, CommandInteraction, Message } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'search the query!',
    options: [
		{
			name: "query",
			type: "STRING",
			description: "What you want to search",
			required: true,
		},
	],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        await interaction.defer();
		
		let key = client.config.google_KEY;
		let csx = client.config.engine_id
		let query = interaction.options.get("query");

		if (!query)
			return interaction.reply(`Provide a query to google !! \`${client.config.prefix}google Apple\``);

		async function search(query) {
			const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
				key: key, cx: csx, safe: "off", q: query
			});

			if (!body.items) return null;
			return body.items[0];

		}

		let href = await search(query);
		if (!href)
			return interaction.reply(`Couldn't search **${query}**`)

		const embed = new MessageEmbed()
			.setTitle(href.title)
			.setDescription(href.snippet)
			.setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
			.setURL(href.link)
			.setColor(client.color)
			.setFooter({text:`Requested by ${interaction.author.username}`, iconURL: interaction.author.displayAvatarURL({ dynamic: true })})
			.setTimestamp()

			
		await interaction.editReply({ embeds: [embed] });

    },
};