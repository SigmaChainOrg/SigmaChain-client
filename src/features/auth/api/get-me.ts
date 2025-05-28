"use client";

import { UserQuery, UserRead } from "@/features/auth/types/user";
import axios from "@/features/axios-client";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const getMe = async (query: UserQuery): Promise<UserRead> => {
  const response = await axios.get("/auth/me", {
    params: snakeCaseParser(query),
  });
  const { ok, details, data } = response.data;

  if (!ok) {
    throw new Error(details ?? "Unknown error occurred while fetching user.");
  }

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  if (data.user_info?.birth_date) {
    data.user_info.birth_date = new Date(data.user_info.birth_date);
  }

  return camelCaseParser<UserRead>(data);
};
