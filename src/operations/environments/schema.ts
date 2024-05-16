import z from "zod";

export const envVariableSchema = z.object({
  var_id: z.string(),
  environment_id: z.string(),
  name: z.string().min(1),
  value: z.string().min(1),
  archived: z.boolean(),
});
