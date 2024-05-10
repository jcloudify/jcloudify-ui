import {Box, CircularProgress} from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
