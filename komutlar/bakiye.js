const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const fs = require('fs');
const checkBalance = require("../fonksiyonlar/checkBalance");

module.exports = {
  name: 'bakiye',
  description: 'Paranızı gösterir.',
  execute(message, args) {
    const aydi = message.author.id;

    const raw = fs.readFileSync('./money.json');
    const paradata = JSON.parse(raw);

    checkBalance(aydi);
    
    const bara = paradata[aydi].money;
    message.reply(`Hesabınızda ${bara} TL var.`);
  },
};
