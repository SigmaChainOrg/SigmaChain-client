"use client";

import { SigninInput } from "@/features/auth/types/sign";
import axios from "@/features/axios-client";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";
import { SecureCodeRead } from "../types/secure-code";
import { TokenRead } from "../types/token";

export const postSignin = async (input: SigninInput): Promise<TokenRead | SecureCodeRead> => {
  const response = await axios.post("/auth/signin", snakeCaseParser(input));
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<TokenRead | SecureCodeRead>(data);
};
