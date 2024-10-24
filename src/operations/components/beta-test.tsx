import {Alert, Box} from "@mui/material";

export const BetaTest: React.FC = () => {
  return (
    <Box sx={{my: 1}}>
      <Alert severity="warning">
        JCloudify is currently in beta testing and is free of charge, so make
        the most of it! Billing is provided for information only.
      </Alert>
    </Box>
  );
};
