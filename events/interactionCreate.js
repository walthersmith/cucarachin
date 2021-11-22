const wait = require('util').promisify(setTimeout);
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const embed = new MessageEmbed();

module.exports = {
    name: "interactionCreate",
    description: "interactionCreate",
    async execute(interaction) {
        console.log(`${interaction.user.tag} in ${interaction.channel.name} triggered an interaction.`)
        if (interaction.isSelectMenu()) {
            if (interaction.customId === 'select') {
                await interaction.deferUpdate(); 
 
                console.log(interaction.member.voice.channel);
                if (interaction.member.voice.channel) { // Checking if the member is connected to a VoiceChannel.
                    // The member is connected to a voice channel.
                    // https://discord.js.org/#/docs/main/stable/class/VoiceState
                    console.log(`${interaction.member.user.tag} is connected to ${interaction.member.voice.channel.name}!`);
                    fetch(`https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 86400,
                            max_uses: 0,
                            target_application_id: "755600276941176913",
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${interaction.client.token}`,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => res.json())
                    .then(invite => {
                        if (!invite.code) return interaction.channel.send("❌ | Could not start **YouTube Together**!");
                        //interaction.channel.send(`✅ | Click here to start **YouTube Together** in ${interaction.channel.name} <https://discord.gg/${invite.code}>`);
                        interaction.editReply({ content: `✅ | Click here to start **YouTube Together** in ${interaction.channel.name} <https://discord.gg/${invite.code}>`, components: [] });
                    })
                 } else {
                    // The member is not connected to a voice channel.
                    console.log(`${interaction.member.user.tag} is not connected.`);
                 };                
            }
        }
    },
}