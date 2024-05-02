import React from "react";
import {AppBar as RAAppBar} from "react-admin";
import {Typography} from "@mui/material";

export const AppBar: React.FC = () => {
  return (
    <RAAppBar>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Poja
      </Typography>
    </RAAppBar>
  );
};
