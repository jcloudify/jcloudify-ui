import {useEffect} from "react";
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
import {useDebounceCallback} from "usehooks-ts";

export interface BatchRecordEditorProps {
  /** describes what exactly is the key values to edit e.g: EnvVars, Config */
  kvLabels?: [string, string];
  placeholders?: [string, string];
  name?: string;
  onChange?: (record: KeyValue[]) => void;
  defaultRecord?: KeyValue[];
}

const schema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  _deleted: z.boolean(),
  _newlyAdded: z.boolean(),
});

export type KeyValue = z.infer<typeof schema>;

// TODO: edit env
export const BatchRecordEditor: React.FC<BatchRecordEditorProps> = ({
  onChange: _onChange,
  name = "key_values",
  kvLabels = ["Key", "Value"],
  placeholders = ["Name", "Value"],
  defaultRecord = [],
}) => {
  const onChange = useDebounceCallback(optional(_onChange).call, 500);
  const toRemove = useSet<KeyValue>();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        [name]: z.array(schema),
      })
    ),
    values: {
      [name]: defaultRecord,
    },
  });

  const {append, remove} = useFieldArray({
    control: form.control,
    name,
  });

  useEffect(() => {
    const subs = form.watch((v = {}) => {
      const keyValues = v[name] as KeyValue[];
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

      onChange(v[name] as KeyValue[]);
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const keyValues = form.watch(name);

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
        const errors = (form.formState.errors[name] || [])[idx];
        return (
          <GridLayout xs={4} spacing={2} key={`${name}.${idx}`}>
            <>
              <OutlinedInput
                placeholder={placeholders[0]}
                fullWidth
                {...form.register(`${name}.${idx}.key`)}
              />
              <FormHelperText error>
                {errors?.key?.message?.toString() ?? " "}
              </FormHelperText>
            </>

            <>
              <OutlinedInput
                placeholder={placeholders[1]}
                fullWidth
                {...form.register(`${name}.${idx}.value`)}
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
                    form.setValue(`${name}.${idx}`, {
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
          data-testid={"AddAnother" + name}
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

export const fromRecord = (record: Record<string, string>): KeyValue[] => {
  const keyValues = Object.entries(record).map(([key, value]) => ({
    key,
    value,
    _deleted: false,
    _newlyAdded: false,
  }));
  return keyValues;
};

export const toRecord = (keyValues: KeyValue[]) => {
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
