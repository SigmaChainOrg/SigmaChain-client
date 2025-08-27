import { AssigneeType } from "./enums";

export interface ActivityAssigneeInput {
  assigneeType: AssigneeType;
  userId?: string;
  groupId?: string;
}
s;
export interface ActivityAssigneeRead {
  assigneeType: AssigneeType;
  userId?: string;
  groupId?: string;
}
