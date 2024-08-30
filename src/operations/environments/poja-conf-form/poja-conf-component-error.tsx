import {Stack, Typography, Chip} from "@mui/material";
import {Unarchive} from "@mui/icons-material";
import {typoSizes} from "@/components/typo";

export const PojaConfVersionUnavailable: React.FC<{version: string}> = ({
  version,
}) => {
  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Unarchive sx={{fontSize: "9rem", opacity: 0.3}} />
      <Typography variant={typoSizes.md.primary} mt={3} color="error">
        Poja Conf &nbsp;
        <Chip
          size="small"
          color="error"
          label={<Typography variant="body2">v{version}</Typography>}
          variant="filled"
          sx={{
            width: "fit-content",
          }}
        />
        &nbsp; is currently not available
      </Typography>
    </Stack>
  );
};

export const NoPojaConfVersionSelected = () => {
  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Unarchive sx={{fontSize: "9rem", opacity: 0.3}} />
      <Typography variant={typoSizes.md.primary} mt={3} color="error">
        No Poja Conf version selected
      </Typography>
    </Stack>
  );
};
