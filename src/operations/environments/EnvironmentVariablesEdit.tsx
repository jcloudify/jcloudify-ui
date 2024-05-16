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
  Grid,
  Stack,
  Typography,
  Box,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import {Add, Remove, Cancel, Save} from "@mui/icons-material";
import {nanoid} from "nanoid";
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";
import {getIds} from "@/operations/utils/record";
import {useSet} from "@/hooks";
import {envVariableSchema} from "./schema";
import z from "zod";

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
      <ListEnvEdit />
    </ListBase>
  );
};

const ListEnvEdit: React.FC = () => {
  const deleteIds = useSet<string>();
  const [p] = useSearchParams();
  const {data: variables = []} = useListContext();
  const [updateMany, {isLoading}] = useUpdateMany();

  const envId = p.get("env");

  const form = useForm({
    resolver: zodResolver(
      z.object({
        variables: z.array(envVariableSchema),
      })
    ),
    values: {
      variables: variables.map(mapVarIdWithNamedId),
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
      <Box mb={2}>
        <KVPair
          k={<Typography variant="h6">Key</Typography>}
          v={<Typography variant="h6">value</Typography>}
          tail={<></>}
        />
      </Box>

      {fields.map((variable, idx) => {
        const {var_id: id} = variable;
        const isInDeleteState = deleteIds.has(id);
        const message = (form.formState.errors.variables || [])[idx];
        return (
          <KVPair
            key={`variables.${idx}`}
            k={
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
            }
            v={
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
            }
            tail={
              <IconButtonWithTooltip
                label={isInDeleteState ? "Cancel removal" : "Remove"}
                onClick={() => {
                  rmFieldOrToggleDeletion(id, idx);
                }}
              >
                {isInDeleteState ? <Cancel /> : <Remove />}
              </IconButtonWithTooltip>
            }
          />
        );
      })}

      <Stack direction="row" spacing={2}>
        <Button
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
          startIcon={<Save />}
          type="submit"
          size="large"
          variant="contained"
          label="Save"
          disabled={isLoading}
        />
      </Stack>
    </Stack>
  );
};

const KVPair: React.FC<{
  k: React.ReactNode;
  v: React.ReactNode;
  tail?: React.ReactNode;
}> = ({k, v, tail}) => (
  <>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        {k}
      </Grid>

      <Grid item xs>
        {v}
      </Grid>

      {!!tail && (
        <Grid item xs={1}>
          {tail}
        </Grid>
      )}
    </Grid>
  </>
);

/**
 * react-hook-form uses the 'id' key internally (replaces it) so rename it
 */
const mapVarIdWithNamedId = (variable: Record<string, any>) => {
  return {
    environment_id: variable.environment_id,
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
