export type APIResponse<T = unknown> = {
  data?: T;
  error?: string;
};

export type TimeRange = {
  startDate: string;
  endDate: string;
};

export type NoTimestamp<T> = Omit<T, "created_at" | "updated_at">;
export type NoId<T> = Omit<T, "id">;
export type NoIdAndTimestamp<T> = Omit<T, "id" | "created_at" | "updated_at">;
export type NoUser<T> = Omit<T, "user_id">;
export type ExtractData<T extends (...args: any) => Promise<{ data?: any }>> =
  NonNullable<Awaited<ReturnType<T>>["data"]>;
export type ExtractDataItem<
  T extends (...args: any) => Promise<{ data?: any }>,
> = ExtractData<T> extends Array<infer U> ? U : never;
