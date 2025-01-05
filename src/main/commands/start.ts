import { SlashCommandBuilder } from '@discordjs/builders';
import { askOpenAI } from '../../utils/open-ai-adapter';
import { prompts } from '../../utils/prompt-adapter';

export const startCommand = new SlashCommandBuilder()
  .setName('start')
  .setDescription('Inicia uma nova situação de sobrevivência.');

export const startController = {
  command: startCommand,
  handle: async (interaction: any) => {
    try {
      const response = await askOpenAI(prompts.start);

      await interaction.reply(response || 'Houve um problema ao gerar a situação. Tente novamente.');
    } catch (error) {
      console.error('Erro no comando /start:', error);
      await interaction.reply('Erro ao iniciar a situação. Tente novamente mais tarde.');
    }
  },
};
