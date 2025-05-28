"use client";

import axios from "@/features/axios-client";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";
import { SecureCodeValidate } from "../types/secure-code";
import { TokenRead } from "../types/token";

export const postSecureCodeValidate = async (input: SecureCodeValidate): Promise<TokenRead> => {
  const response = await axios.post("/auth/secure-code/validate", snakeCaseParser(input));
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  return camelCaseParser<TokenRead>(data);
};
