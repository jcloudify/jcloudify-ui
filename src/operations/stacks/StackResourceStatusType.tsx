import {Chip, Typography} from "@mui/material";
import {StackResourceStatusType as StackResourceStatusTypeEnum} from "@jcloudify-api/typescript-client";

export interface StackResourceStatusTypeProps {
  value: StackResourceStatusTypeEnum;
}

const INDICATOR_COLORS = {
  CREATE_IN_PROGRESS: "#007DBC", // Blue
  CREATE_FAILED: "#D13212", // Red
  CREATE_COMPLETE: "#1E8900", // Green
  DELETE_IN_PROGRESS: "#007DBC", // Blue
  DELETE_FAILED: "#D13212", // Red
  DELETE_COMPLETE: "#1E8900", // Green
  DELETE_SKIPPED: "#007DBC", // Blue
  UPDATE_IN_PROGRESS: "#007DBC", // Blue
  UPDATE_FAILED: "#D13212", // Red
  UPDATE_COMPLETE: "#1E8900", // Green
  IMPORT_IN_PROGRESS: "#007DBC", // Blue
  IMPORT_FAILED: "#D13212", // Red
  IMPORT_COMPLETE: "#1E8900", // Green
  IMPORT_ROLLBACK_IN_PROGRESS: "#007DBC", // Blue
  IMPORT_ROLLBACK_FAILED: "#D13212", // Red
  IMPORT_ROLLBACK_COMPLETE: "#1E8900", // Green
  UPDATE_ROLLBACK_IN_PROGRESS: "#007DBC", // Blue
  UPDATE_ROLLBACK_COMPLETE: "#1E8900", // Green
  UPDATE_ROLLBACK_FAILED: "#D13212", // Red
  ROLLBACK_IN_PROGRESS: "#007DBC", // Blue
  ROLLBACK_COMPLETE: "#1E8900", // Green
  ROLLBACK_FAILED: "#D13212", // Red
  UNKNOWN_TO_SDK_VERSION: "#808080", // Gray (indicative of unknown or unsupported status)
} as const;

export const StackResourceStatusType: React.FC<
  StackResourceStatusTypeProps
> = ({value}) => {
  return (
    <Chip
      size="small"
      label={<Typography variant="body2">{value}</Typography>}
      variant="outlined"
      sx={{
        width: "fit-content",
        border: `1px solid ${INDICATOR_COLORS[value]}`,
        color: INDICATOR_COLORS[value],
      }}
    />
  );
};
