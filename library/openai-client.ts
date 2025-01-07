import OpenAI from "npm:openai"

const openAIClient = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY")
})

export default openAIClient
