import {Chip, Typography} from "@mui/material";

export const JCBot = () => {
  return (
    <Chip
      size="small"
      label={
        <Typography variant="body2" component="b">
          JCloudify Bot
        </Typography>
      }
      variant="outlined"
      sx={{
        width: "fit-content",
        bgcolor: "gray",
        color: "#f2f2f2",
      }}
    />
  );
};
