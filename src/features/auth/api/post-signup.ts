"use server";
import { SignupInput } from "@/features/auth/types/sign";
import axios from "@/features/axios";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";
import { SecureCodeRead } from "../types/secure-code";

export const postSignup = async (input: SignupInput): Promise<SecureCodeRead> => {
  const response = await axios.post("/auth/signup", snakeCaseParser(input));
  const general = response.data;

  if (general.ok !== true) {
    throw new Error(general.details);
  }

  const data = general.data;

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<SecureCodeRead>(data);
};
