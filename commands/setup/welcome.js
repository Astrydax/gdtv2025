const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    category: 'setup',
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Creates a welcome channel and posts the introduction message.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Restrict command to admins
    async execute(interaction) {
        const guild = interaction.guild;
        if (!guild) return interaction.reply({ content: "This command must be used inside a server!", ephemeral: true });

        // Create the welcome channel
        try {
            const welcomeChannel = await guild.channels.create({
                name: 'welcome-nomads', // Adjust the name if needed
                type: 0, // 0 = text channel
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });

            // Construct the welcome message
            const embed = new EmbedBuilder()
                .setTitle('🛸 Welcome, Nomad! 🛸')
                .setDescription(`
You have arrived in a world of wandering colonies, ambitious queens, and thriving hives. Your journey begins now!

🔹 **Level up by sending messages** to gain experience.  
🔹 **Reach Level 3** to claim your place in the hive by founding your own colony or joining another.  
🔹 **Collaborate, scout, and raid** to grow and defend your empire.  

💡 Ready to carve out your legacy? Click below to begin your rise!  
            `)
                .setColor('#FFD700');

            const startButton = new ButtonBuilder()
                .setCustomId('start_colony')
                .setLabel('🔘 Start Your Colony')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(startButton);

            // Send the welcome message in the new channel
            await welcomeChannel.send({ embeds: [embed], components: [row] });

            await interaction.reply({ content: `✅ Welcome channel **${welcomeChannel.name}** has been created!`, ephemeral: true });

        } catch (error) {
            console.error("Error creating welcome channel:", error);
            await interaction.reply({ content: "❌ Failed to create the welcome channel. Check bot permissions.", ephemeral: true });
        }
    },
};