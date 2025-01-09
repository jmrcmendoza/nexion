import { Trigger } from "deno-slack-sdk/types.ts"
import { TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts"
import BugOverviewWorkflow from "../workflows/bug_overview_workflow.ts"

const bugOverviewTrigger: Trigger<typeof BugOverviewWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Generate Bug Overview Trigger",
  description: "Trigger the workflow when a message is posted with specific text",
  workflow: `#/workflows/${BugOverviewWorkflow.definition.callback_id}`,
  inputs: {
    channel: {
      value: "{{data.channel_id}}"
    },
    user: {
      value: "{{data.user_id}}"
    }
  },
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: ["C087T2P047P", "C01HWMJ5MT4", "C087VQMHG0K"],
    filter: {
      version: 1,
      root: {
        statement: "{{data.text}} == 'generate bug overview'"
      }
    }
  }
}

export default bugOverviewTrigger
