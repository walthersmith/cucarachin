const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Get information about the server'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nServer ID: ${interaction.guild.id}\nTotal members: ${interaction.guild.memberCount}`);
    }
};