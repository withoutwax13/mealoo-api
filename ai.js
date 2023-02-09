import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv'

dotenv.config()

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    maxResponseTokens: 4000
})

export default api