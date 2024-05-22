import {Stack, StackProps, Typography} from "@mui/material";

export interface HeadingProps extends Omit<StackProps, "title" | "subtitle"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({title, subtitle, ...rest}) => (
  <Stack direction="column" gap={1} mb={3} {...rest}>
    {typeof title === "string" ? (
      <Typography variant="h5" fontWeight="450">
        {title}
      </Typography>
    ) : (
      title
    )}

    {typeof subtitle === "string" ? (
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    ) : (
      title
    )}
  </Stack>
);
