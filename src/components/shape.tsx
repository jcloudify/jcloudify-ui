import {Box} from "@mui/material";

export const Octagon: React.FC<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color?: string;
}> = ({top, right, bottom, left, color = "primary.main"}) => (
  <Box
    sx={{
      width: 200,
      height: 200,
      backgroundColor: color,
      position: "absolute",
      clipPath:
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      top,
      right,
      bottom,
      left,
    }}
  />
);
