import React from "react";
import {Labeled as RALabeled, FunctionField, FieldProps} from "react-admin";

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
