import React, {useMemo} from "react";
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
} from "@/components/batch-record-editor";
import {
  BatchArrayEditor,
  BatchArrayEditorProps,
} from "@/components/batch-array-editor";
import {RecordShow, RecordShowProps} from "@/components/record-show";
import {StringArrayShow} from "@/components/string-array-show";
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
  const defaultValue = useMemo(() => field.value, []);
  return (
    <BatchRecordEditor
      defaultRecord={defaultValue || defaultRecord}
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
  const {field} = useInput({source: source!});
  const defaultValue = useMemo(() => field.value, []);
  return (
    <BatchArrayEditor
      defaultValues={defaultValue || defaultValues}
      onChange={field.onChange}
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
}: Pick<FieldProps<RecordType>, "source"> & Nullable<RecordShowProps>) => {
  const record = useRecordContext();
  return (
    <StringArrayShow
      stringArray={get(record, source!) || propValue}
      {...rest}
    />
  );
};
