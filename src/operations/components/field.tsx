import React, {useMemo} from "react";
import {
  Labeled as RALabeled,
  FunctionField,
  FieldProps,
  RaRecord,
  useInput,
} from "react-admin";
import {BatchRecordEditor} from "@/components/batch-record-editor";

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

export const BatchRecordEditorField = <RecordType extends RaRecord<string>>({
  source,
}: FieldProps<RecordType>) => {
  const {field} = useInput({source: source!});
  const defaultValue = useMemo(() => field.value, []);
  return (
    <BatchRecordEditor defaultRecord={defaultValue} onChange={field.onChange} />
  );
};
