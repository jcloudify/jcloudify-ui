import React from "react";
import {AppBarProps as RAAppBarProps, AppBar as RAAppBar} from "react-admin";

// open to cusomization
export const AppBar: React.FC<RAAppBarProps> = (props) => {
  return <RAAppBar {...props} />;
};
