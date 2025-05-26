export interface ActivityInput {
  activityOrder: number;
  label: string;
  description: string;
  assignee: ActivityAssigneeInput;
  estimatedTime: string | null;
}

export interface ActivityAssigneeInput {
  assigneeType: "user" | "group" | "requester";
  userId: string | null;
  groupId: string | null;
}
