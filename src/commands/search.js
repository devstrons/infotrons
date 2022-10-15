const { MessageEmbed } = require("discord.js")
const request = require('node-superfetch');

module.exports = {
	name: "search",
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

		let key = client.config.google_KEY;
		let csx = client.config.engine_id
		let query = args.join(" ");

		if (!query)
			return message.reply(`Provide a query to google !! \`${client.config.prefix}google Apple\``);

		async function search(query) {
			const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
				key: key, cx: csx, safe: "off", q: query
			});

			if (!body.items) return null;
			return body.items[0];

		}

		let href = await search(query);
		if (!href)
			return message.reply(`Couldn't search **${query}**`)

		const embed = new MessageEmbed()
			.setTitle(href.title)
			.setDescription(href.snippet)
			.setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
			.setURL(href.link)
			.setColor(client.color)
			.setFooter({text:`Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
			.setTimestamp()

			
		return message.channel.send({embeds: [embed]})

	}


}

