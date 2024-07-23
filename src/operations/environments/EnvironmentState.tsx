import {Chip, Typography} from "@mui/material";
import {colors} from "@/themes";
import {EnvironmentStateEnum} from "@jcloudify-api/typescript-client";

export interface EnvironmentStateProps {
  value: EnvironmentStateEnum;
}

const INDICATOR_COLORS = {
  HEALTHY: colors("success"),
  UNHEALTHY: colors("error"),
} as const;

export const ENVIRONMENT_STATE_TEXT = {
  HEALTHY: "Healthy",
  UNHEALTHY: "Unhealthy",
} as const;

export const EnvironmentState: React.FC<EnvironmentStateProps> = ({value}) => {
  return (
    <Chip
      size="small"
      label={
        <Typography variant="body2">
          {ENVIRONMENT_STATE_TEXT[value] || value}
        </Typography>
      }
      variant="filled"
      sx={{
        width: "fit-content",
        bgcolor: INDICATOR_COLORS[value] || "gray",
        color: "#fff",
      }}
    />
  );
};
