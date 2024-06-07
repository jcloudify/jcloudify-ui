import {Chip, Typography} from "@mui/material";
import {TODO_Deployment} from "@/services/poja-api";
import {colors} from "@/themes";

export interface DeploymentStateProps {
  value: TODO_Deployment["state"];
}

const INDICATOR_COLORS = {
  READY: colors("success"),
  IN_PROGRESS: colors("warning"),
  FAILED: colors("error"),
} as const;

const TEXT_VIEW = {
  READY: "Ready",
  IN_PROGRESS: "In Progress",
  FAILED: "Failed",
} as const;

export const DeploymentState: React.FC<DeploymentStateProps> = ({value}) => {
  return (
    <Chip
      size="small"
      label={<Typography variant="body2">{TEXT_VIEW[value]}</Typography>}
      variant="filled"
      sx={{
        width: "fit-content",
        bgcolor: INDICATOR_COLORS[value],
        color: "#fff",
      }}
    />
  );
};
