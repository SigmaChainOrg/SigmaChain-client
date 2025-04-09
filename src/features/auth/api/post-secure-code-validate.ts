"use server";
import axios from "@/features/axios";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";
import { SecureCodeValidate } from "../types/secure-code";
import { TokenRead } from "../types/token";

export const postSecureCodeValidate = async (input: SecureCodeValidate): Promise<TokenRead> => {
  const response = await axios.post("/auth/secure-code/validate", snakeCaseParser(input));
  const general = response.data;

  if (general.ok !== true) {
    throw new Error(general.details);
  }

  return camelCaseParser<TokenRead>(general.data);
};
