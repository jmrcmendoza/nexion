import { Version3Client } from "npm:jira.js"

const client = new Version3Client({
  host: Deno.env.get("JIRA_HOST") as string,
  authentication: {
    basic: {
      username: Deno.env.get("JIRA_USER"),
      password: Deno.env.get("JIRA_PASSWORD")
    }
  }
})

export default client
