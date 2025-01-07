import JiraApi from "npm:jira-client"

const jiraClient = new JiraApi({
  protocol: "https",
  host: Deno.env.get("JIRA_HOST") as string,
  username: Deno.env.get("JIRA_USER"),
  password: Deno.env.get("JIRA_PASSWORD"),
  apiVersion: "2",
  strictSSL: true
})

export default jiraClient
