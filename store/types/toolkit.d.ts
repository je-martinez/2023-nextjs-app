type RejectedThunkResult =
  | unknown
  | string
  | ({
      arg: undefined;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | ({
          rejectedWithValue: false;
        } & {})
    ))
  | SerializedError;
