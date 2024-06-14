import React from "react";
import {Grid, GridProps} from "@mui/material";

export type GridLayoutProps = {
  children: React.ReactNode;
} & GridProps;

/**
 * UNFINISHED
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  sm,
  xs,
  md,
  lg,
  ...rest
}) => {
  return (
    <Grid container {...rest}>
      {React.Children.map(children, (node) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
          {node}
        </Grid>
      ))}
    </Grid>
  );
};
