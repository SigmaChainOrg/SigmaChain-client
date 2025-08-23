import { ActivityAssigneeInput, ActivityAssigneeRead } from "./activity-assignee";

export interface ActivityInput {
  activityOrder: number;
  label: string;
  description: string;
  assignee: ActivityAssigneeInput;
  estimatedTime: string | null;
}

export interface ActivityRead {
  activityId: string;
  activityOrder: number;
  label: string;
  description: string;
  assignee?: ActivityAssigneeRead;
  formPatternId?: string;
  nextActivityId?: string;
  estimatedTime?: string;
}
