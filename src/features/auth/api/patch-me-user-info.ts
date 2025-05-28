"use client";

import { UserInfoUpdate, UserRead } from "@/features/auth/types/user";
import axios from "@/features/axios-client";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const patchUserInfo = async (input: UserInfoUpdate): Promise<UserRead> => {
  const response = await axios.patch("/auth/me/user-info", snakeCaseParser(input));
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<UserRead>(data);
};
