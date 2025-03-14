export type Response<T> = {
  ok: boolean;
  status: number;
  data: T;
};
