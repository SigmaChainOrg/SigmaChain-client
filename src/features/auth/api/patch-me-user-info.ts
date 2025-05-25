import { UserInfoUpdate, UserRead } from "@/features/auth/types/user";
import axios from "@/features/axios";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const patchUserInfo = async (input: UserInfoUpdate): Promise<UserRead> => {
  const response = await axios.patch("/auth/me/user-info", snakeCaseParser(input));
  const general = response.data;

  if (general.ok !== true) {
    throw new Error(general.details);
  }

  const data = general.data;

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<UserRead>(data);
};
