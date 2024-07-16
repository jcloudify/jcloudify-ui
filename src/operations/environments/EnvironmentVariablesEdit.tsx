import {EnvironmentVariable} from "@jcloudify-api/typescript-client";
import {useEffect, useMemo} from "react";
import {Button, IconButtonWithTooltip, useUpdateMany} from "react-admin";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Stack,
  Typography,
  Box,
  FormHelperText,
  OutlinedInput,
  Divider,
} from "@mui/material";
import {Add, Remove, Cancel, Save} from "@mui/icons-material";
import {nanoid} from "nanoid";
import {z} from "zod";
import {getIds} from "@/operations/utils/record";
import {GridLayout} from "@/components/grid";
import {envVariableSchema} from "./schema";
import {colors} from "@/themes";
import {optional} from "@/utils/monad";
import {ToRecord} from "@/providers";
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";
import {useSet} from "@/hooks";

export type EnvironmentVariableEditProps = {
  onChange?: (variables: EnvironmentVariable[]) => void;
  defaultVars?: EnvironmentVariable[];
  saveEnvId?: string;
  hasSave?: boolean;
};

// TODO: edit env
export const EnvironmentVariablesEdit: React.FC<
  EnvironmentVariableEditProps
> = ({
  onChange,
  saveEnvId,
  hasSave = false,
  defaultVars: _defaultVars = [],
}) => {
  const toRemoveIds = useSet<string>();
  const [updateMany, {isLoading}] = useUpdateMany();

  const defaultVars = useMemo(() => {
    return _defaultVars.map((v) => mapVarIdWithNamedId({...v, id: nanoid()}));
  }, [_defaultVars]);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        variables: z.array(envVariableSchema),
      })
    ),
    values: {
      variables: defaultVars,
    },
  });

  const {append, remove} = useFieldArray({
    control: form.control,
    name: "variables",
  });

  useEffect(() => {
    const subs = form.watch((v) => {
      optional(onChange).call(normalizeVars(v.variables as any[]));
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const variables = form.watch("variables");

  const save: InferSubmitHandlerFromUseForm<typeof form> = () => {
    const vars = normalizeVars(variables);
    updateMany("env_variables", {data: vars, ids: getIds(vars)});
  };

  return (
    <Stack
      component="form"
      direction="column"
      p={1}
      gap={1.5}
      onSubmit={form.handleSubmit(save)}
    >
      <Box>
        <GridLayout xs={4} spacing={2}>
          <Typography variant="h6">Key</Typography>
          <Typography variant="h6">value</Typography>
        </GridLayout>
      </Box>

      <Divider sx={{mb: 2, borderColor: colors("gray-0")}} />

      {variables.map((variable, idx) => {
        const {var_id: id, archived} = variable;
        const message = (form.formState.errors.variables || [])[idx];
        return (
          <GridLayout xs={4} spacing={2} key={`variables.${idx}`}>
            <>
              <OutlinedInput
                placeholder="e.g: CLIENT_KEY"
                fullWidth
                {...form.register(`variables.${idx}.name`)}
              />
              <FormHelperText error>
                {message?.name?.message?.toString() ?? " "}
              </FormHelperText>
            </>

            <>
              <OutlinedInput
                placeholder="XXX"
                fullWidth
                {...form.register(`variables.${idx}.value`)}
              />
              <FormHelperText error>
                {message?.value?.message?.toString() ?? " "}
              </FormHelperText>
            </>
            <Stack justifyContent="center" alignItems="center">
              <IconButtonWithTooltip
                label={archived ? "Cancel removal" : "Remove"}
                onClick={() => {
                  if (id) {
                    form.setValue(`variables.${idx}`, {
                      ...variable,
                      archived: !archived,
                    });
                    archived ? toRemoveIds.delete(id) : toRemoveIds.add(id);
                  } else {
                    remove(idx);
                  }
                }}
              >
                {archived ? <Cancel /> : <Remove />}
              </IconButtonWithTooltip>
            </Stack>
          </GridLayout>
        );
      })}

      <Stack direction="row" spacing={2}>
        <Button
          data-testid="AddAnotherEnvVar"
          startIcon={<Add />}
          size="large"
          variant="outlined"
          label="Add Another"
          onClick={() => {
            append({
              name: "",
              value: "",
              environment_id: saveEnvId,
              archived: false,
              var_id: "",
            });
          }}
        />
        {hasSave && saveEnvId && (
          <Button
            data-testid="SaveEnvVar"
            startIcon={<Save />}
            type="submit"
            size="large"
            variant="contained"
            label="Save"
            disabled={
              isLoading || (!form.formState.isDirty && !toRemoveIds.size)
            }
          />
        )}
      </Stack>
    </Stack>
  );
};

/**
 * react-hook-form uses the 'id' key internally (replaces it) so rename it
 */
const mapVarIdWithNamedId = (variable: EnvironmentVariable) => {
  return {
    environment_id: (variable as any).environment_id,
    var_id: variable.id,
    name: variable.name,
    value: variable.value,
    archived: variable.archived,
  };
};

/**
 * map to its real struct
 */
const mapVarIdWithId = (variable: Record<string, any>) => {
  return {
    environment_id: variable.environment_id,
    id: variable.var_id,
    name: variable.name,
    value: variable.value,
    archived: variable.archived,
  };
};

const normalizeVars = (
  rawVars: Record<string, any>[]
): ToRecord<EnvironmentVariable>[] => {
  return rawVars.map((aVar) => {
    const v = mapVarIdWithId(aVar);
    v.id ||= nanoid();
    return v;
  });
};
