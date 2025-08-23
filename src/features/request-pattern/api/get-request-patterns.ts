"use client";

import axios from "@/features/axios-client";
import {
  RequestPatternFilters,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const getRequestPatterns = async (
  filters: RequestPatternFilters,
): Promise<RequestPatternRead[]> => {
  const response = await axios.get("/request-patterns", {
    params: snakeCaseParser(filters),
  });
  const { ok, details, data } = response.data;

  if (ok !== true) {
    throw new Error(details);
  }

  return camelCaseParser<RequestPatternRead[]>(data);
};
