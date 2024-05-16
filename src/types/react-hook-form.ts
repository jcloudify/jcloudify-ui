import {UseFormReturn, SubmitHandler} from "react-hook-form";

export type InferSubmitHandlerFromUseForm<T extends UseFormReturn<any>> =
  T extends UseFormReturn<infer FieldValues>
    ? SubmitHandler<FieldValues>
    : never;
