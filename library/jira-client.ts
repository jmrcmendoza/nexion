import { Version3Client } from "npm:jira.js"

const jira = async (config: { host: string; username: string; password: string }) =>
  new Version3Client({
    host: config.host,
    authentication: {
      basic: {
        username: config.username,
        password: config.password
      }
    }
  })

export default jira
