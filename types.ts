export enum JiraIssueType {
  EPIC = "EPIC",
  BUG = "BUG",
  TASK = "TASK",
  SUBTASK = "SUBTASK",
  STORY = "STORY",
  HOTFIX = "HOTFIX",
  DEFECT = "DEFECT",
  BASIC_TASK = "BASIC_TASK"
}

export enum JiraIssueJobType {
  BACKEND = "BACKEND",
  FRONTEND = "FRONTEND"
}

export type JiraIssueFilter = Partial<{
  statuses: JiraStatus[]
  assignees: string[]
  types: string
}>

export enum JiraStatus {
  BACKLOG = "Backlog",
  READY = "Ready",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  CANCELED = "Canceled",
  UAT_FAILED_PRODUCTION = "UAT Failed (Production)",
  UAT_FAILED_STAGING = "UAT Failed (Staging)",
  UAT_PRODUCTION = "UAT (Production)",
  UAT_STAGING = "UAT (Staging)",
  READY_FOR_RELEASE = "Ready for Release"
}

export interface Issue {
  key: string
  summary: string
  assignee: {
    displayName: string
    id: string
  }
  reporter: {
    displayName: string
    id: string
  }
  status: JiraStatus
  type: JiraIssueType
  statusCategoryChangeDate: string
  comments?: {}
}

export type JiraIssueFieldsResponse = {
  summary: string
  issuetype: { id: string }
  status: { name: string }
  subtasks?: { key: string; fields: JiraIssueFieldsResponse }[]
  parent?: { key: string; fields: JiraIssueFieldsResponse }
  assignee: { accountId: string; displayName: string }
  reporter: { accountId: string; displayName: string }
  statuscategorychangedate: string
  updated: string
  created: string
  description?: string
  priority?: { name: string }
  comment?: { comments: [accountId: string, displayName: string, body: string] }
}

export type JiraChangeLogResponse = {
  histories: {
    created: string
    items: [{ field: string; fromString: string; toString: string }]
  }[]
}

export type JiraRequestOptions = {
  startAt: number
  maxResults: number
  total: number
}
