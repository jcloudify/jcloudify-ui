import {
  Divider as MUIDivider,
  DividerProps as MUIDividerProps,
} from "@mui/material";
import {colors} from "@/themes";

export const Divider: React.FC<MUIDividerProps> = ({sx, ...rest}) => (
  <MUIDivider sx={{...sx, borderColor: colors("gray-1")}} {...rest} />
);
