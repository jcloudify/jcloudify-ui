import {Chip, Typography} from "@mui/material";
import {StackType as StackTypeEnum} from "@jcloudify-api/typescript-client";

export interface StackTypeProps {
  value: StackTypeEnum;
}

const INDICATOR_COLORS = {
  [StackTypeEnum.EVENT]: "#e4b866",
  [StackTypeEnum.STORAGE_DATABASE_SQLITE]: "#1E5893",
  [StackTypeEnum.COMPUTE_PERMISSION]: "#ED8134",
  [StackTypeEnum.STORAGE_BUCKET]: "#3A7E21",
} as const;

export const STACK_TYPE_TEXT = {
  [StackTypeEnum.EVENT]: "Event",
  [StackTypeEnum.STORAGE_DATABASE_SQLITE]: "Storage Database SQlite",
  [StackTypeEnum.COMPUTE_PERMISSION]: "Compute Permission",
  [StackTypeEnum.STORAGE_BUCKET]: "Storage Bucket",
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
