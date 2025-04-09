import snakecaseKeys from "snakecase-keys";

export function snakeCaseParser<T>(data: any): T {
  return snakecaseKeys(data, { deep: true }) as T;
}
