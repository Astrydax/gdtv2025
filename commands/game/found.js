const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    category: "game",
    data: new SlashCommandBuilder()
        .setName('found')
        .setDescription('Creates a category and channels within it')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the category')
                .setRequired(true)
        ),
    async execute(interaction) {
        const categoryName = interaction.options.getString('name');
        const guild = interaction.guild;

        try {
            // Create the category (GuildCategory)
            const category = await guild.channels.create({
                name: categoryName,
                type: ChannelType.GuildCategory,
            });

            // Create the "anthill" text channel inside the category
            await guild.channels.create({
                name: 'anthill',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            // Create the "queen's chamber" text channel inside the category
            await guild.channels.create({
                name: "queen's chamber",
                type: ChannelType.GuildText,
                parent: category.id,
            });

            await interaction.reply(`✅ Created category **${categoryName}** with channels **anthill** and **queen's chamber** successfully!`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Failed to create the category and channels.', ephemeral: true });
        }
    },
};