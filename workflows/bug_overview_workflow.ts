import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts"
import { BugOverviewMessageFunction } from "../functions/bug_overview_message_function.ts"

const BugOverviewWorkflow = DefineWorkflow({
  callback_id: "bug_overview_workflow",
  title: "Bug Overview Workflow",
  description: "Sends an action point overview for the bug",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id
      },
      user: {
        type: Schema.slack.types.user_id
      }
    },
    required: ["channel", "user"]
  }
})

const bugOverviewFunctionStep = BugOverviewWorkflow.addStep(BugOverviewMessageFunction, {})

BugOverviewWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: BugOverviewWorkflow.inputs.channel,
  message: bugOverviewFunctionStep.outputs.message
})

export default BugOverviewWorkflow
