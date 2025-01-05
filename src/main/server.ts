import { Interaction } from 'discord.js';
import env from './config/env';
import { commands } from './commands';
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const rest = new REST({ version: '10' }).setToken(env.discordSecret);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(env.clientID), {
      body: commands.map((command) => command.command.toJSON()),
    });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Erro ao registrar os comandos:', error);
  }
})();

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand() || !interaction.isChatInputCommand()) {
    console.warn('Interação ignorada: não é um comando válido.');
    return;
  }

  const { commandName } = interaction;

  console.log(`Comando recebido: ${commandName} pelo usuário: ${interaction.user.tag}`);

  const command = commands.find((cmd) => cmd.command.name === commandName);

  if (command && typeof command.handle === 'function') {
    try {
      console.log(`Executando comando: ${commandName}`);
      await command.handle(interaction);
    } catch (error) {
      console.error(`Erro ao executar o comando ${commandName}:`, error);
      await interaction.reply({
        content: 'Houve um erro ao executar o comando. Tente novamente mais tarde.',
        ephemeral: true,
      });
    }
  } else {
    console.warn(`Comando ${commandName} não encontrado ou mal definido.`);
    await interaction.reply({
      content: 'Comando não reconhecido ou está mal implementado.',
      ephemeral: true,
    });
  }
});

client.login(env.discordSecret);
