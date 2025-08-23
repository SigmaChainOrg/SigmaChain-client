"use client";

import axios from "@/features/axios-client";
import { GroupFilters, GroupRead } from "@/features/group/types/group";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const getGroups = async (filters: GroupFilters): Promise<GroupRead[]> => {
  const response = await axios.get("/groups", {
    params: snakeCaseParser(filters),
  });
  const { ok, details, data } = response.data;

  if (!ok) {
    throw new Error(details ?? "Unknown error occurred while fetching groups.");
  }

  return camelCaseParser<GroupRead[]>(data);
};
