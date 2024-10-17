import {Chip, ChipProps, Typography} from "@mui/material";
import {EnvironmentType as IEnvironmentType} from "@jcloudify-api/typescript-client";

export interface EnvironmentTypeProps {
  value: IEnvironmentType;
  size?: ChipProps["size"];
}

const INDICATOR_COLORS = {
  PROD: "#DC143C",
  PREPROD: "#00008B",
} as const;

export const ENVIRONMENT_TYPE_TEXT = {
  PROD: "Prod",
  PREPROD: "Preprod",
} as const;

export const EnvironmentType: React.FC<EnvironmentTypeProps> = ({
  value,
  size = "small",
}) => {
  return (
    <Chip
      size={size}
      label={
        <Typography variant="body2">
          {ENVIRONMENT_TYPE_TEXT[value] || value}
        </Typography>
      }
      variant="filled"
      sx={{
        width: "fit-content",
        bgcolor: INDICATOR_COLORS[value] || "gray",
        color: "#fff",
        padding: 0,
        margin: 0,
      }}
    />
  );
};
