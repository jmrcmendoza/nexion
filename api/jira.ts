import pick from "https://deno.land/x/ramda@v0.27.2/source/pick.js"
import flatten from "https://deno.land/x/ramda@v0.27.2/source/flatten.js"
import head from "https://deno.land/x/ramda@v0.27.2/source/head.js"

import client from "../library/jira-client.ts"

import {
  Issue,
  JiraChangeLogResponse,
  JiraIssueFieldsResponse,
  JiraIssueFilter,
  JiraIssueType,
  JiraRequestOptions,
  JiraStatus
} from "../types.ts"

const issueTypes = {
  "10000": "EPIC",
  "10001": "STORY",
  "10002": "TASK",
  "10003": "SUBTASK",
  "10004": "BUG",
  "10260": "TASK",
  "10261": "EPIC",
  "10263": "BUG",
  "10264": "STORY",
  "10266": "SUBTASK",
  "10282": "DEFECT",
  "10315": "DEFECT",
  "10355": "BASIC_TASK"
} as Record<string, JiraIssueType>

export class JiraAPI {
  static async getIssues(filter?: JiraIssueFilter): Promise<
    JiraRequestOptions & {
      issues: Issue[]
    }
  > {
    let status = `(Done, Canceled)`

    let types = "(Bug)"

    const query = [
      'project = "ROW"',
      `status NOT IN ${status}`,
      `type in ${types}`,
      filter?.assignees?.length ? `assignee in (${filter.assignees.join(", ")})` : undefined
    ]
      .filter((index) => !!index)
      .join(" AND ")

    const jql = `${query} ORDER BY created DESC, resolved DESC, status DESC, updated DESC`

    const result = (await client.issueSearch.searchForIssuesUsingJql({
      jql
    })) as JiraRequestOptions & {
      issues: {
        key: string
        changelog: JiraChangeLogResponse
        fields: JiraIssueFieldsResponse
      }[]
    }

    const issues: Issue[] = await Promise.all(
      result?.issues?.map(async (issue) => {
        const commentsResponse = await client.issueComments.getComments({
          issueIdOrKey: issue.key
        })

        const comments = commentsResponse?.comments
          ?.map((comment: any) => ({
            accountId: comment.author.accountId,
            displayName: comment.author.displayName,
            body: head(
              comment.body.content.map((data) =>
                data.content
                  .map((comment) => {
                    if (comment.type === "text") return comment.text
                    if (comment.type === "media")
                      return comment.attrs?.alt
                        ? `${comment.attrs?.alt}|width:${comment.attrs?.width}|height:${comment.attrs?.height}`
                        : ""
                    if (comment.type === "mention") return comment.attrs.text

                    return ""
                  })
                  .filter((comment) => !!comment)
                  .join("")
              )
            )
          }))
          .filter((comment) => comment.body) as any

        return {
          key: issue.key,
          summary: issue.fields.summary,
          assignee: {
            id: issue.fields?.assignee?.accountId,
            displayName: issue.fields?.assignee?.displayName
          },
          reporter: {
            id: issue.fields?.reporter?.accountId,
            displayName: issue.fields?.reporter?.displayName
          },
          status: issue.fields?.status?.name as JiraStatus,
          type: issueTypes[issue.fields?.issuetype?.id],
          statusCategoryChangeDate: issue.fields?.statuscategorychangedate,
          comments,
          priority: issue.fields?.priority?.name,
          description: head(
            flatten(
              issue.fields?.description?.content?.map((desc) =>
                desc.content
                  .map((description) => description.attrs?.text || description.text)
                  .filter((description) => !!description)
              ) || []
            )
          )
        }
      })
    )

    return {
      ...pick(["startAt", "maxResults", "total"])(result as any),
      issues
    } as any
  }
}
