const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('select an activity!') ,
    async execute(interaction) {
  
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'YOUTUBE',
                            description: 'Youtube dentro de discord',
                            value: 'youtube',
                        }
                    ]),
            );

        await interaction.reply({ content: 'selecciona la actividad que quieres iniciar (BETA)!', components: [row] });
    }
};