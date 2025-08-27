import { GroupSimpleRead } from "@/features/group/types/group";
import { ActivityInput, ActivityRead } from "./activity";

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
  supervisorId?: string;
  activityId: string;
  publishedAt?: string;
  isActive: boolean;
  createdAt: string;
  groups?: GroupSimpleRead[];
  activities?: ActivityRead[];
}

export interface RequestPatternQuery {
  include_groups?: boolean;
  include_activities?: boolean;
}

export interface RequestPatternFilters {
  label?: string;
  supervisorId?: string;
  is_published?: boolean;
  is_active?: boolean;
  include_groups?: boolean;
  include_activities?: boolean;
}
