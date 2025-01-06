export default {
  port: process.env.PORT || 5050,
  clientID: process.env.CLIENT_ID || '',
  discordSecret: process.env.JWT || '',
  openAiSecret: process.env.API_KEY_OPENAI || ''
}