import camelcaseKeys from "camelcase-keys";

export function camelCaseParser<T>(data: any): T {
  return camelcaseKeys(data, { deep: true }) as T;
}
