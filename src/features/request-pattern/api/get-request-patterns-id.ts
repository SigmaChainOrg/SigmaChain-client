"use client";

import axios from "@/features/axios-client";
import {
  RequestPatternQuery,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const getRequestPatternsId = async (
  id: string,
  query: RequestPatternQuery,
): Promise<RequestPatternRead> => {
  const response = await axios.get(`/request-patterns/${id}`, { params: snakeCaseParser(query) });
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  return camelCaseParser<RequestPatternRead>(data);
};
