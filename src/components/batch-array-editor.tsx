import {useEffect} from "react";
import {IconButtonWithTooltip} from "react-admin";
import {Button, Stack, OutlinedInput, FormHelperText} from "@mui/material";
import {Add, Remove, Cancel} from "@mui/icons-material";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {GridLayout} from "@/components/grid";
import {optional} from "@/utils/monad";
import {useSet} from "@/hooks";
import {useDebounceCallback} from "usehooks-ts";

export interface BatchArrayEditorProps {
  onChange?: (values: StringValue[]) => void;
  defaultValues?: StringValue[];
  placeholder?: string;
  name?: string;
}

const schema = z.object({
  value: z.string().min(1),
  _deleted: z.boolean(),
  _newlyAdded: z.boolean(),
});

export type StringValue = z.infer<typeof schema>;

export const BatchArrayEditor: React.FC<BatchArrayEditorProps> = ({
  onChange: _onChange,
  placeholder = "foo",
  defaultValues = [],
  name = "Value",
}) => {
  const onChange = useDebounceCallback(optional(_onChange).call, 250);
  const toRemove = useSet<StringValue>();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        [name]: z.array(schema),
      })
    ),
    values: {
      [name]: defaultValues,
    },
  });

  const {append, remove} = useFieldArray({
    control: form.control,
    name,
  });

  useEffect(() => {
    const subs = form.watch((v = {}) => {
      onChange(v[name] as StringValue[]);
    });
    return () => {
      subs.unsubscribe();
    };
  }, [form.watch]);

  const stringValues = form.watch(name);

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
                {...form.register(`${name}.${idx}.value`)}
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
                    form.setValue(`${name}.${idx}`, {
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

export const toStringValue = (strings: string[]) => {
  return strings.map((str) => ({
    value: str,
    _deleted: false,
    _newlyAdded: false,
  }));
};

export const fromStringValue = (values: StringValue[]) => {
  return values.filter((v) => !v._deleted).map((v) => v.value);
};
