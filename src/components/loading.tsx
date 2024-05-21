import {Stack, CircularProgress, Typography, SxProps} from "@mui/material";

const sizes = {
  md: {
    primary: "h5",
    secondary: "body2",
  },
  lg: {
    primary: "h4",
    secondary: "body1",
  },
} as const;

export interface LoadingProps {
  primaryText?: string;
  secondaryText?: string;
  sx?: SxProps;
  size?: keyof typeof sizes;
}

export const Loading: React.FC<LoadingProps> = ({
  primaryText,
  secondaryText,
  sx,
  size = "md",
}) => {
  const variant = sizes[size];
  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={sx}
    >
      <CircularProgress sx={{color: "#000"}} />
      <Typography variant={variant.primary} mt={3}>
        {primaryText}
      </Typography>
      <Typography variant={variant.secondary} color="text.secondary">
        {secondaryText}
      </Typography>
    </Stack>
  );
};
