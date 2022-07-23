const { Client, Collection, Intents } = require("discord.js");
const { readdirSync } = require("fs");

class Infotrons extends Client {
    constructor(options = {}) {
        super({
            ...options,
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                //Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING
            ],
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false,
            },
            partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
            fetchAllMembers: false,
            messageCacheMaxSize: 100,
            restTimeOffset: 0,
            restWsBridgetimeout: 100,
        });
        this.config = require("./config");
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.aliases = new Collection();
        this.owner = this.config.Bot_owenerID;
        this.prefix = this.config.prefix;
        this.emoji = require('./utility/emojis.json');
        this.color = this.config.Bot_embedColor;
    }

    // –– Events Handler ––––––––––––––––––––––––––––––––––––––––——––––––––––––– 

    loadClientEvents() {

        readdirSync("./src/events/").forEach(file => {
            const event = require(`../src/events//${file}`);
            let eventName = file.split(".")[0];
            console.log(`Loading Events ${eventName}`);
            this.on(event.name, (...args) => event.run(this, ...args));

        });

    }

    // –– Commands Handler –––––––––––––––––––––––––––––––––––––––––––––––––––– 

    loadCommands() {
        readdirSync("./Commands").forEach(dir => {
            const commandFiles = readdirSync(`./Commands/`).filter(f => f.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../Commands/${file}`);
                console.log(`[ • ] Message Command Loaded: ${command.category} - ${command.name}`, "cmd");
                this.commands.set(command.name, command);
            }
        });
    }

    // –– SlashCommands Handler –––––––––––––––––––––––––––––––––––––––––––––––––––– 

    loadSlashCommands() {
        const data = [];
        readdirSync("./SlashCommands").forEach((dir) => {
            const slashCommandFile = readdirSync(`./SlashCommands/`).filter((files) => files.endsWith(".js"));

            for (const file of slashCommandFile) {
                const slashCommand = require(`../SlashCommands/${file}`);

                if (!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

                if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

                this.slashCommands.set(slashCommand.name, slashCommand);
                console.log(`[ / ] Slash Command Loaded: ${slashCommand.name}`, "cmd");
                data.push(slashCommand);
            }
        });
        this.on("ready", async () => {
            await this.application.commands.set(data).then(() => console.log(`Successfully Loaded All Slash Commands`, "cmd")).catch((e) => console.log(e));
        });
    }


    login() {

        if (!this.config.Bot_Token)
            throw new Error("You must pass the token for the client...");

        super.login(this.config.Bot_Token);

    }

    async start() {

        this.loadCommands();
        this.loadClientEvents();
        this.loadSlashCommands();
        this.login();

    }

}

module.exports = Infotrons;