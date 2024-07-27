import {useMemo, useEffect} from "react";
import {IconButtonWithTooltip} from "react-admin";
import {Button, Stack, OutlinedInput, FormHelperText} from "@mui/material";
import {Add, Remove, Cancel} from "@mui/icons-material";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {GridLayout} from "@/components/grid";
import {optional} from "@/utils/monad";
import {useSet} from "@/hooks";

export interface BatchArrayEditorProps {
  onChange?: (values: string[]) => void;
  defaultValues?: string[];
  placeholder?: string;
  name?: string;
}

const schema = z.object({
  value: z.string().min(1),
  _deleted: z.boolean(),
  _newlyAdded: z.boolean(),
});

type _InternalValue = z.infer<typeof schema>;

export const BatchArrayEditor: React.FC<BatchArrayEditorProps> = ({
  onChange,
  placeholder = "foo",
  defaultValues: _defaultValues = [],
  name = "Value",
}) => {
  const toRemove = useSet<_InternalValue>();
  const defaultValues = useMemo(() => {
    return toInternal(_defaultValues);
  }, [_defaultValues]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        stringValues: z.array(schema),
      })
    ),
    values: {
      stringValues: defaultValues,
    },
  });

  const {append, remove} = useFieldArray({
    control: form.control,
    name: "stringValues",
  });

  useEffect(() => {
    const subs = form.watch((v = {}) => {
      optional(onChange).call(toStrings(v.stringValues as _InternalValue[]));
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const stringValues = form.watch("stringValues");

  return (
    <Stack direction="column" p={1}>
      {stringValues.map((stringValue, idx) => {
        const {_deleted, _newlyAdded} = stringValue;
        const errors = (form.formState.errors.stringValues || [])[idx];
        return (
          <GridLayout xs={6} spacing={2} key={`variables.${idx}`}>
            <>
              <OutlinedInput
                placeholder={placeholder}
                fullWidth
                {...form.register(`stringValues.${idx}.value`)}
              />
              <FormHelperText error>
                {errors?.message?.toString() ?? " "}
              </FormHelperText>
            </>

            <Stack justifyContent="center" alignItems="center">
              <IconButtonWithTooltip
                label={_deleted ? "Cancel removal" : "Remove"}
                onClick={() => {
                  if (!_newlyAdded) {
                    form.setValue(`stringValues.${idx}`, {
                      ...stringValue,
                      _deleted: !_deleted,
                    });
                    _deleted
                      ? toRemove.delete(stringValue)
                      : toRemove.add(stringValue);
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

const toInternal = (strings: string[]) => {
  return strings.map((str) => ({
    value: str,
    _deleted: false,
    _newlyAdded: false,
  }));
};

const toStrings = (values: _InternalValue[]) => {
  return values.filter((v) => !v._deleted).map((v) => v.value);
};
