/**
 * Deep partial type that supports marking a type as preserved to avoid "partializing" it.
 */
export type DeepPartial<T> =
  T extends Preserve<infer U>
    ? U
    : T extends object
      ? {
          [P in keyof T]?: DeepPartial<T[P]>;
        }
      : T;

export type Preserve<T> = T;
