import OpenAI from 'openai';
import env from '../main/config/env';

const openai = new OpenAI({
  apiKey: env.openAiSecret,
});

export const askOpenAI = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content || 'Resposta vazia da OpenAI.';
  } catch (error) {
    console.error('Erro ao chamar a OpenAI:', error);
    throw new Error('Erro ao processar a solicitação.');
  }
};
