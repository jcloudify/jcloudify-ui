import {Chip, Typography} from "@mui/material";
import {StackType as StackTypeEnum} from "@jcloudify-api/typescript-client";

export interface StackTypeProps {
  value: StackTypeEnum;
}

const INDICATOR_COLORS = {
  [StackTypeEnum.EVENT]: "#e4b866",
  [StackTypeEnum.STORAGE_DATABASE_SQLITE]: "#1E5893",
  [StackTypeEnum.COMPUTE_PERMISSION]: "#72973E",
  [StackTypeEnum.STORAGE_BUCKET]: "#3A7E21",
  [StackTypeEnum.COMPUTE]: "#EE8134",
} as const;

export const STACK_TYPE_TEXT = {
  [StackTypeEnum.EVENT]: "EVENT",
  [StackTypeEnum.STORAGE_DATABASE_SQLITE]: "STORAGE DATABASE SQLITE",
  [StackTypeEnum.COMPUTE_PERMISSION]: "COMPUTE PERMISSION",
  [StackTypeEnum.STORAGE_BUCKET]: "STORAGE BUCKET",
  [StackTypeEnum.COMPUTE]: "COMPUTE",
} as const;

export const StackType: React.FC<StackTypeProps> = ({value}) => {
  return (
    <Chip
      size="small"
      label={
        <Typography variant="body2">
          {STACK_TYPE_TEXT[value] || value}
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
