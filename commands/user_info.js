const { SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user_info')
    .setDescription('Get information about a user'),
    async execute(interaction){
        await interaction.reply(`${interaction.user.username}'s info:\n Your ID: ${interaction.user.id}\nTag: ${interaction.user.tag}`);
    }
}