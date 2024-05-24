import {Stack, CircularProgress, Typography, SxProps} from "@mui/material";
import {TypoSizes, typoSizes} from "@/components/typo";

export interface LoadingProps {
  primaryText?: string;
  secondaryText?: string;
  sx?: SxProps;
  size?: TypoSizes;
}

export const Loading: React.FC<LoadingProps> = ({
  primaryText,
  secondaryText,
  sx,
  size = "md",
}) => {
  const typo = typoSizes[size];
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
      <Typography variant={typo.primary} mt={3}>
        {primaryText}
      </Typography>
      <Typography variant={typo.secondary} color="text.secondary">
        {secondaryText}
      </Typography>
    </Stack>
  );
};
