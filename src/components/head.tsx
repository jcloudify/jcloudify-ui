import {Stack, StackProps, Typography} from "@mui/material";
import {TypoSizes, typoSizes} from "./typo";
import {colors} from "@/themes";

export interface HeadingProps extends Omit<StackProps, "title" | "subtitle"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  isError?: boolean;
  size?: TypoSizes;
  withBorder?: boolean;
}

const BORDER_PROPS = {
  border: `1px solid ${colors("gray-1")}`,
  p: 1,
} as const;

export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  actions,
  isError,
  size = "md",
  withBorder,
  ...rest
}) => {
  const typo = typoSizes[size];
  const borderProps = withBorder ? BORDER_PROPS : {};
  return (
    <Stack direction="column" gap={2} mb={3} {...rest} {...borderProps}>
      <Stack height="100%" width="100%" gap={rest["gap"] || 1}>
        {typeof title === "string" ? (
          <Typography
            variant={typo.primary}
            fontWeight="450"
            color={isError ? "error" : "#000"}
          >
            {title}
          </Typography>
        ) : (
          title
        )}

        {typeof subtitle === "string" ? (
          <Typography variant={typo.secondary} color="text.secondary">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </Stack>

      {actions}
    </Stack>
  );
};
