import "jsr:@std/dotenv/load"
import { Manifest } from "deno-slack-sdk/mod.ts"
import BugOverviewWorkflow from "./workflows/bug_overview_workflow.ts"

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Nexion",
  description: "An AI powered assistant for your team",
  icon: "assets/default_new_app_icon.png",
  workflows: [BugOverviewWorkflow],
  outgoingDomains: ["identifi.atlassian.net", "api.openai.com"],
  datastores: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "groups:history"
  ]
})
