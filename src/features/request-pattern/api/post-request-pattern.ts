"use server";
import axios from "@/features/axios";
import {
  RequestPatternInput,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { snakeCaseParser } from "@/utils/snake-case-parser";

export const postRequestPattern = async (
  input: RequestPatternInput,
  token: string,
): Promise<RequestPatternRead> => {
  const response = await axios.post("/request-patterns", snakeCaseParser(input), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const general = response.data;

  if (general.ok !== true) {
    throw new Error(general.details);
  }

  const data = general.data;

  if (data.created_at) {
    data.created_at = new Date(data.created_at);
  }

  return camelCaseParser<RequestPatternRead>(data);
};
