import {useEffect, useMemo} from "react";
import {IconButtonWithTooltip} from "react-admin";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Stack,
  Typography,
  Box,
  FormHelperText,
  OutlinedInput,
  Divider,
  Button,
} from "@mui/material";
import {Add, Remove, Cancel} from "@mui/icons-material";
import {z} from "zod";
import {GridLayout} from "@/components/grid";
import {envVariableSchema} from "./schema";
import {colors} from "@/themes";
import {optional} from "@/utils/monad";
import {useSet} from "@/hooks";
import {
  EnvironmentRecord,
  environmentArrayToRecord,
  environmentRecordToArray,
} from "./";

export type BatchEnvironmentVariableEditProps = {
  onChange?: (variables: Record<string, string>) => void;
  defaultVars?: Record<string, string>;
};

// TODO: edit env
export const BatchEnvironmentVariableEdit: React.FC<
  BatchEnvironmentVariableEditProps
> = ({onChange, defaultVars: _defaultVars = {}}) => {
  const toRemove = useSet<EnvironmentRecord>();
  const defaultVars = useMemo(() => {
    return environmentRecordToArray(_defaultVars);
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
      optional(onChange).call(
        environmentArrayToRecord(v.variables as EnvironmentRecord[])
      );
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const variables = form.watch("variables");

  return (
    <Stack direction="column" p={1} gap={1.5}>
      <Box>
        <GridLayout xs={4} spacing={2}>
          <Typography variant="h6">Key</Typography>
          <Typography variant="h6">value</Typography>
        </GridLayout>
      </Box>

      <Divider sx={{mb: 2, borderColor: colors("gray-0")}} />

      {variables.map((variable, idx) => {
        const {isNew, deleted} = variable;
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
                label={deleted ? "Cancel removal" : "Remove"}
                onClick={() => {
                  if (!isNew) {
                    form.setValue(`variables.${idx}`, {
                      ...variable,
                      deleted: !deleted,
                    });
                    deleted
                      ? toRemove.delete(variable)
                      : toRemove.add(variable);
                  } else {
                    remove(idx);
                  }
                }}
              >
                {deleted ? <Cancel /> : <Remove />}
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
          onClick={() => {
            append({
              name: "",
              value: "",
              isNew: true,
              deleted: false,
            });
          }}
        >
          Add Another
        </Button>
      </Stack>
    </Stack>
  );
};
