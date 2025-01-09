import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts"
import generateBugOverview from "../library/generate-bug-overview.ts"

export const BugOverviewMessageFunction = DefineFunction({
  callback_id: "bug_overview_message_function",
  title: "Generate a bug overview message",
  description: "Generate a bug overview messageg",
  source_file: "functions/bug_overview_message_function.ts",
  input_parameters: {
    properties: {},
    required: []
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Greeting for the recipient"
      }
    },
    required: ["message"]
  }
})

export default SlackFunction(BugOverviewMessageFunction, async ({ env }) => {
  const jiraOptions = {
    host: env["JIRA_HOST"],
    username: env["JIRA_USER"],
    password: env["JIRA_PASSWORD"]
  }

  const openAIOptions = {
    apiKey: env["OPENAI_API_KEY"],
    baseURL: env["OPENAI_BASE_URL"]
  }

  const message = await generateBugOverview({ jiraOptions, openAIOptions })

  return { outputs: { message } }
})
