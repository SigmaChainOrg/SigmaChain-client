"use client";

import axios from "@/features/axios-client";
import {
  RequestPatternInput,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const postRequestPattern = async (
  input: RequestPatternInput,
): Promise<RequestPatternRead> => {
  const response = await axios.post("/request-patterns", snakeCaseParser(input));
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<RequestPatternRead>(data);
};
