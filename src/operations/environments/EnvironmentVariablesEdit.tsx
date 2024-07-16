import {EnvironmentVariable} from "@jcloudify-api/typescript-client";
import {useCallback, useEffect} from "react";
import {
  Button,
  IconButtonWithTooltip,
  Identifier,
  ListBase,
  ListProps,
  RaRecord,
  useListContext,
  useUpdateMany,
} from "react-admin";
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
import {useSet} from "@/hooks";
import {GridLayout} from "@/components/grid";
import {envVariableSchema} from "./schema";
import {colors} from "@/themes";
import {optional} from "@/utils/monad";
import {ToRecord} from "@/providers";
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";

export type EnvironmentVariablesEditProps<
  Record extends RaRecord<Identifier> = any,
> = Omit<ListProps<Record>, "resource" | "queryOptions" | "children"> & {
  envId?: string;
  onChange?: (variables: EnvironmentVariable[]) => void;
};

// TODO: edit env
export const EnvironmentVariablesEdit: React.FC<
  EnvironmentVariablesEditProps
> = ({envId: env_id, onChange, ...rest}) => {
  return (
    <ListBase
      resource="env_variables"
      queryOptions={{
        meta: {
          env_id,
        },
      }}
      {...rest}
    >
      <ListEnvEdit key={env_id} onChange={onChange} />
    </ListBase>
  );
};

const ListEnvEdit: React.FC<
  Pick<EnvironmentVariablesEditProps, "onChange" | "envId">
> = ({envId, onChange}) => {
  const deleteIds = useSet<string>();
  const {data: vars = []} = useListContext<Required<EnvironmentVariable>>({
    resource: "env_variables",
  });
  const [updateMany, {isLoading}] = useUpdateMany();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        variables: z.array(envVariableSchema),
      })
    ),
    values: {
      variables: vars.map(mapVarIdWithNamedId),
    },
  });

  useEffect(() => {
    const subs = form.watch((v) => {
      optional(onChange).call(normalizeVars(v.variables as any[], deleteIds));
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch, deleteIds]);

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const rmFieldOrToggleDeletion = useCallback(
    (id: string | undefined, idx: number) => {
      if (id) {
        // toggle deletion
        deleteIds.has(id) ? deleteIds.delete(id) : deleteIds.add(id);
      } else {
        remove(idx);
      }
    },
    [fields]
  );

  const variables = form.watch("variables");
  const save: InferSubmitHandlerFromUseForm<typeof form> = () => {
    const vars = normalizeVars(variables, deleteIds);
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

      {fields.map((variable, idx) => {
        const {var_id: id} = variable;
        const isInDeleteState = deleteIds.has(id!);
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
                label={isInDeleteState ? "Cancel removal" : "Remove"}
                onClick={() => {
                  rmFieldOrToggleDeletion(id, idx);
                }}
              >
                {isInDeleteState ? <Cancel /> : <Remove />}
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
              environment_id: envId!,
              archived: false,
              var_id: "",
            });
          }}
        />
        {envId && (
          <Button
            data-testid="SaveEnvVar"
            startIcon={<Save />}
            type="submit"
            size="large"
            variant="contained"
            label="Save"
            disabled={isLoading || (!form.formState.isDirty && !deleteIds.size)}
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
  rawVars: Record<string, any>[],
  toDeleteIds: Set<string>
): ToRecord<EnvironmentVariable>[] => {
  return rawVars.map((aVar) => {
    const v = mapVarIdWithId(aVar);
    if (!v.id) {
      v.id = nanoid();
    } else {
      if (toDeleteIds.has(v.id)) {
        v.archived = true;
      }
    }
    return v;
  });
};
