import { FlattenedGroup, GroupRead } from "@/features/group/types/group";

export function getFlattenGroups(groups: GroupRead[], parentRoute: string = ""): FlattenedGroup[] {
  const result: FlattenedGroup[] = [];

  for (const group of groups) {
    const currentRoute = `${parentRoute}/${group.name}`;
    result.push({
      groupId: group.groupId,
      name: group.name,
      users: group.users,
      route: currentRoute,
    });

    if (group.childGroups?.length) {
      const children = getFlattenGroups(group.childGroups, currentRoute);
      result.push(...children);
    }
  }

  return result;
}
