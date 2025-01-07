import { OpenAIAPI } from "../api/openai.ts"
import { JiraAPI } from "../api/jira.ts"

function formatTicketLinks(input) {
  const regex = /\*\*(ROW-\d{4,})\*\*/g

  const output = input.replace(regex, (_: any, ticketId: string) => {
    return `<https://identifi.atlassian.net/browse/${ticketId}|${ticketId}>`
  })

  return output
}

export default async function generateBugOverview(): Promise<string> {
  const response = await JiraAPI.getIssues()

  const result = await OpenAIAPI.generateBugOverview(response?.issues)

  return formatTicketLinks(result)
}
