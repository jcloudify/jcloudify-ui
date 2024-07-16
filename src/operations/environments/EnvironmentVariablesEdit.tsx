import {EnvironmentVariable} from "@jcloudify-api/typescript-client";
import {useCallback} from "react";
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
import {useSearchParams} from "react-router-dom";
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
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";
import {getIds} from "@/operations/utils/record";
import {useSet} from "@/hooks";
import {z} from "zod";
import {envVariableSchema} from "./schema";
import {colors} from "@/themes";
import {GridLayout} from "@/components/grid";

export type EnvironmentVariablesEditProps<
  Record extends RaRecord<Identifier> = any,
> = Omit<ListProps<Record>, "resource" | "queryOptions" | "children"> & {
  envId: string;
};

// TODO: edit env
export const EnvironmentVariablesEdit: React.FC<
  EnvironmentVariablesEditProps
> = ({envId: env_id, ...rest}) => {
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
      <ListEnvEdit key={env_id} />
    </ListBase>
  );
};

const ListEnvEdit: React.FC = () => {
  const deleteIds = useSet<string>();
  const [p] = useSearchParams();
  const {data: vars = []} = useListContext<Required<EnvironmentVariable>>({
    resource: "env_variables",
  });
  const [updateMany, {isLoading}] = useUpdateMany();

  const envId = p.get("env");

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

  const save: InferSubmitHandlerFromUseForm<typeof form> = ({
    variables: data,
  }) => {
    const variables = data.map((aVar) => {
      const v = mapVarIdWithId(aVar);
      if (!v.id) {
        v.id = nanoid();
      } else {
        if (deleteIds.has(v.id)) {
          v.archived = true;
        }
      }
      return v;
    });
    updateMany("env_variables", {data: variables, ids: getIds(variables)});
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
        <Button
          data-testid="SaveEnvVar"
          startIcon={<Save />}
          type="submit"
          size="large"
          variant="contained"
          label="Save"
          disabled={isLoading || (!form.formState.isDirty && !deleteIds.size)}
        />
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
