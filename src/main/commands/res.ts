import { SlashCommandBuilder } from '@discordjs/builders';
import { askOpenAI } from '../../utils/open-ai-adapter';
import { prompts } from '../../utils/prompt-adapter';

export const resCommand = new SlashCommandBuilder()
  .setName('res')
  .setDescription('Responde à situação de sobrevivência.')
  .addStringOption((option) =>
    option.setName('action')
      .setDescription('O que você faria?')
      .setRequired(true)
  );

export const resController = {
  command: resCommand,
  handle: async (interaction: any) => {
    try {
      const userAction = interaction.options.getString('action');
      const prompt = prompts.response(userAction);
      const response = await askOpenAI(prompt);

      await interaction.reply(response || 'Houve um problema ao processar sua ação. Tente novamente.');
    } catch (error) {
      console.error('Erro no comando /res:', error);
      await interaction.reply('Erro ao processar sua resposta. Tente novamente mais tarde.');
    }
  },
};
