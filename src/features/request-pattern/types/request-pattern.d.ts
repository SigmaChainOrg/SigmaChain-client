import { ActivityInput } from "./activity";

export interface RequestPatternInput {
  label: string;
  description: string;
  supervisorId: string | null;
  groups: string[];
  activities: ActivityInput[];
}

export interface RequestPatternRead {
  requestPatternId: string;
  label: string;
  description: string;
  supervisorId: string | null;
  activityId: string;
  isPublished: boolean;
  publishedAt: string | null;
  isActive: boolean;
  createdAt: string;
  groups: string[];
  activities: RequestPatternRead[];
}
