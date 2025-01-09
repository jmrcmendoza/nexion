import OpenAI from "npm:openai"

const openai = async (config: { apiKey: string; baseURL: string }) =>
  new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    organization: null,
    project: null
  })

export default openai
