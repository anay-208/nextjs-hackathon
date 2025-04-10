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