import React from "react";
import {
  Labeled as RALabeled,
  FunctionField,
  FieldProps,
  RaRecord,
  useInput,
  useRecordContext,
} from "react-admin";
import get from "lodash.get";
import {
  BatchRecordEditor,
  BatchRecordEditorProps,
  fromRecord,
} from "@/components/batch-record-editor";
import {
  BatchArrayEditor,
  BatchArrayEditorProps,
  toStringValue,
} from "@/components/batch-array-editor";
import {RecordShow, RecordShowProps} from "@/components/record-show";
import {
  StringArrayShow,
  StringArrayShowProps,
} from "@/components/string-array-show";
import {Nullable} from "@/types/util";

export type PasswordFieldProps = FieldProps & {
  source: string;
};

/**
 * TODO!
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({
  source,
  ...rest
}) => {
  return (
    <FunctionField<Record<string, string>>
      render={() => {
        return "*".repeat(12);
      }}
      {...rest}
    />
  );
};

export const Labeled: React.FC<React.PropsWithChildren> = ({children}) =>
  React.Children.map(children, (node) => <RALabeled>{node as any}</RALabeled>);

export const renderWithLabel = (node: React.ReactNode) => (
  <Labeled>{node}</Labeled>
);

/**
 * TODO: impl 'label' prop
 */
export const BatchRecordEditorField = <RecordType extends RaRecord<string>>({
  source,
  defaultRecord,
  ...rest
}: Pick<FieldProps<RecordType>, "source"> &
  Omit<BatchRecordEditorProps, "onChange">) => {
  const {field} = useInput({source: source!});
  const val = !Array.isArray(field.value)
    ? fromRecord(field.value)
    : field.value;
  return (
    <BatchRecordEditor
      defaultRecord={val || defaultRecord}
      onChange={field.onChange}
      {...rest}
    />
  );
};

/**
 * 'Show' version of 'BatchRecordEditorField'
 */
export const RecordField = <RecordType extends RaRecord<string>>({
  source,
  record: propValue = {},
  ...rest
}: Pick<FieldProps<RecordType>, "source"> & Nullable<RecordShowProps>) => {
  const record = useRecordContext();
  return <RecordShow record={get(record, source!) || propValue} {...rest} />;
};

/**
 * TODO: impl 'label' prop
 */
export const BatchArrayEditorField = <RecordType extends RaRecord<string>>({
  source,
  defaultValues,
  ...rest
}: Pick<FieldProps<RecordType>, "source"> &
  Omit<BatchArrayEditorProps, "onChange">) => {
  const {
    field: {value, onChange},
  } = useInput({source: source!});
  const val = value.length
    ? typeof value[0] === "string"
      ? toStringValue(value)
      : value
    : [];
  return (
    <BatchArrayEditor
      defaultValues={val || defaultValues}
      onChange={onChange}
      {...rest}
    />
  );
};

/**
 * 'Show' version of 'BatchArrayEditorField'
 */
export const StringArrayField = <RecordType extends RaRecord<string>>({
  source,
  stringArray: propValue = [],
  ...rest
}: Pick<FieldProps<RecordType>, "source"> & Nullable<StringArrayShowProps>) => {
  const record = useRecordContext();
  return (
    <StringArrayShow
      stringArray={get(record, source!) || propValue}
      {...rest}
    />
  );
};
