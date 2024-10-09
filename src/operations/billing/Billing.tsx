import {Box, Stack} from "@mui/material";
import {ShowBillingInfo} from "./ShowBillingInfo";

export const BillingSummary: React.FC = () => {
  return (
    <Box>
      <Stack direction={{sm: "column", md: "row"}} spacing={1}>
        <Box sx={{width: "100%"}}>
          <ShowBillingInfo />
        </Box>
        <Box sx={{width: "100%"}}>
          Non tempor nostrud esse elit elit esse officia. Quis laboris tempor
          labore ut cillum pariatur ut excepteur officia. Ipsum deserunt
          consectetur sint laborum amet tempor consectetur consequat id nulla
          excepteur excepteur nisi labore. Fugiat anim quis ea velit laboris
          incididunt sunt minim.
        </Box>
      </Stack>
    </Box>
  );
};
