import {Box, Typography} from "@mui/material";

export interface StringArrayShowProps {
  stringArray: string[];
  name?: string;
}

export const StringArrayShow: React.FC<StringArrayShowProps> = ({
  stringArray,
  name = "string_values",
}) => {
  return (
    <Box p={1}>
      {stringArray.map((string, idx) => {
        const isLastIndex = idx === stringArray.length - 1;
        return (
          <Typography display="inline" variant="body1" fontWeight="400" id={`${name}-${idx}-string-value`}>
            {`"${string}"`}
            {!isLastIndex ? ", " : ""}
          </Typography>
        );
      })}
    </Box>
  );
};
