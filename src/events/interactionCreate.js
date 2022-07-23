const { Permissions } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const SlashCommands = client.slashCommands.get(interaction.commandName);
      if (!SlashCommands) return;

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES))
        return await interaction.user.dmChannel
          .send({
            content: `I don't have **\`SEND_interactionS\`** permission in <#${interaction.channelId}> to execute this **\`${SlashCommands.name}\`** command.`,
          })
          .catch(() => { });

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS))
        return await interaction
          .reply({
            content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${SlashCommands.name}\`** command.`,
            ephemeral: true,
          })
          .catch(() => { });
      if (!interaction.member.permissions.has(SlashCommands.botPrams || [])) {
        return await interaction.reply({
          content: `I Need Permission to Work this \`${SlashCommands.botPrams.join(', ')}\``,
          ephemeral: true,
        });
      }
      if (!interaction.guild.me.permissions.has(SlashCommands.userPrams || [])) {
        return await interaction.reply({
          content: `You Need this \`${SlashCommands.userPrams.join(
            ', ',
          )}\` Permission to Work this command!`,
          ephemeral: true,
        });
      }
      try {
        await SlashCommands.run(client, interaction);
      } catch (error) {
        if (interaction.replied) {
          await interaction
            .editReply({
              content: `An unexcepted error occured.`,
            })
            .catch(() => { });
        } else {
          await interaction
            .followUp({
              ephemeral: true,
              content: `An unexcepted error occured.`,
            })
            .catch(() => { });
        }
        console.error(error);
      }
    }
  }
};

