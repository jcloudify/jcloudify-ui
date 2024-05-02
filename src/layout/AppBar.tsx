import React from "react";
import {AppBar as RAAppBar} from "react-admin";
import {Box, Typography} from "@mui/material";

export const AppBar: React.FC = () => {
  return (
    <RAAppBar container={React.Fragment}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Poja
      </Typography>
    </RAAppBar>
  );
};
