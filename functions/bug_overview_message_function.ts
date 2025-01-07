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

export default SlackFunction(BugOverviewMessageFunction, async () => {
  const message = await generateBugOverview()

  return { outputs: { message } }
})
