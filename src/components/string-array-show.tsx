import {useMemo} from "react";
import {Box, Typography} from "@mui/material";

export interface StringArrayShowProps {
  stringArray: string[];
}

export const StringArrayShow: React.FC<StringArrayShow> = ({stringArray}) => {
  return (
    <Box p={1}>
      {stringArray.map((string, idx) => {
        const isLastIndex = idx === stringArray.length - 1;
        return (
          <Typography display="inline" variant="body1" fontWeight="400">
            {`"${string}"`}
            {!isLastIndex ? ", " : ""}
          </Typography>
        );
      })}
    </Box>
  );
};
