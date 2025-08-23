import { UserRead } from "@/features/auth/types/user";

export interface GroupSimpleRead {
  groupId: string;
  name: string;
}

export interface GroupRead extends GroupSimpleRead {
  parentId?: string;
  users?: UserRead[];
  childGroups?: GroupRead[];
}

export interface FlattenedGroup extends GroupSimpleRead {
  users?: UserRead[];
  route: string;
}

export interface GroupQuery {
  includeUsers?: boolean;
  includeChildren?: boolean;
}

export interface GroupFilters {
  name?: string;
  includeUsers?: boolean;
}
