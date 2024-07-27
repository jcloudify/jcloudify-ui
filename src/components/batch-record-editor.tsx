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
import {colors} from "@/themes";
import {optional} from "@/utils/monad";
import {useSet} from "@/hooks";

export interface BatchRecordEditorProps {
  /** describes what exactly is the key values to edit e.g: EnvVars, Config */
  kvLabels?: [string, string];
  placeholders?: [string, string];
  pairName?: string;
  onChange?: (record: Record<string, string>) => void;
  defaultRecord?: Record<string, string>;
}

const schema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  _deleted: z.boolean(),
  _newlyAdded: z.boolean(),
});

type _InternalKeyValue = z.infer<typeof schema>;

// TODO: edit env
export const BatchRecordEditor: React.FC<BatchRecordEditorProps> = ({
  onChange,
  pairName = "",
  kvLabels = ["Key", "Value"],
  placeholders = ["Name", "Value"],
  defaultRecord: _defaultRecord = {},
}) => {
  const toRemove = useSet<_InternalKeyValue>();
  const defaultRecord = useMemo(() => {
    return keyValuesFromRecord(_defaultRecord);
  }, [_defaultRecord]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        keyValues: z.array(schema),
      })
    ),
    values: {
      keyValues: defaultRecord,
    },
  });

  const {append, remove} = useFieldArray({
    control: form.control,
    name: "keyValues",
  });

  useEffect(() => {
    const subs = form.watch((v = {}) => {
      const keyValues = v.keyValues as _InternalKeyValue[];
      const keys = keyValues.filter((kv) => !kv._deleted).map((kv) => kv.key);
      const isUnique = keys.length === new Set(keys).size;

      if (!isUnique) {
        form.setError("root.uniqueness", {
          type: "manual",
          message: "Duplicate keys are not allowed",
        });
        return;
      }

      form.clearErrors("root.uniqueness");

      optional(onChange).call(
        recordFromKeyValues(v.keyValues as _InternalKeyValue[])
      );
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const keyValues = form.watch("keyValues");

  return (
    <Stack direction="column" p={1} gap={1.5}>
      <Box>
        <GridLayout xs={4} spacing={2}>
          <Typography variant="body1" fontWeight="450">
            {kvLabels[0]}
          </Typography>
          <Typography variant="body1" fontWeight="450">
            {kvLabels[1]}
          </Typography>
        </GridLayout>
      </Box>

      <Divider sx={{mb: 2, borderColor: colors("gray-0")}} />

      {keyValues.map((keyValue, idx) => {
        const {_deleted, _newlyAdded} = keyValue;
        const errors = (form.formState.errors.keyValues || [])[idx];
        return (
          <GridLayout xs={4} spacing={2} key={`variables.${idx}`}>
            <>
              <OutlinedInput
                placeholder={placeholders[0]}
                fullWidth
                {...form.register(`keyValues.${idx}.key`)}
              />
              <FormHelperText error>
                {errors?.key?.message?.toString() ?? " "}
              </FormHelperText>
            </>

            <>
              <OutlinedInput
                placeholder={placeholders[1]}
                fullWidth
                {...form.register(`keyValues.${idx}.value`)}
              />
              <FormHelperText error>
                {errors?.value?.message?.toString() ?? " "}
              </FormHelperText>
            </>
            <Stack justifyContent="center" alignItems="center">
              <IconButtonWithTooltip
                label={_deleted ? "Cancel removal" : "Remove"}
                onClick={() => {
                  if (!_newlyAdded) {
                    form.setValue(`keyValues.${idx}`, {
                      ...keyValue,
                      _deleted: !_deleted,
                    });
                    _deleted
                      ? toRemove.delete(keyValue)
                      : toRemove.add(keyValue);
                  } else {
                    remove(idx);
                  }
                }}
              >
                {_deleted ? <Cancel /> : <Remove />}
              </IconButtonWithTooltip>
            </Stack>
          </GridLayout>
        );
      })}

      <FormHelperText error>
        {form.formState.errors.root?.uniqueness?.message}
      </FormHelperText>

      <Stack direction="row" spacing={2}>
        <Button
          data-testid={"AddAnother" + pairName}
          startIcon={<Add />}
          size="large"
          variant="outlined"
          onClick={() => {
            append({
              key: "",
              value: "",
              _deleted: false,
              _newlyAdded: true,
            });
          }}
        >
          Add Another
        </Button>
      </Stack>
    </Stack>
  );
};

const keyValuesFromRecord = (
  record: Record<string, string>
): _InternalKeyValue[] => {
  return Object.entries(record).map(([key, value]) => ({
    key,
    value,
    _deleted: false,
    _newlyAdded: false,
  }));
};

const recordFromKeyValues = (keyValues: _InternalKeyValue[]) => {
  return keyValues.reduce(
    (record, pair) => {
      if (!pair._deleted) {
        record[pair.key] = pair.value;
      }
      return record;
    },
    {} as Record<string, string>
  );
};
