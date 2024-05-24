import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";

export interface ButtonProps extends MUIButtonProps {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  isLoading,
  startIcon,
  ...rest
}) => <MUIButton disabled={rest["disabled"] || isLoading} {...rest} />;
