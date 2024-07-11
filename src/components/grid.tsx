import React from "react";
import {Grid, GridProps} from "@mui/material";

export type GridLayoutProps = {
  children: React.ReactNode;
  render?: (node: React.ReactNode) => React.ReactNode;
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
  render,
  ...rest
}) => {
  return (
    <Grid container {...rest}>
      {React.Children.map(children, (node) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
          {render ? render(node) : node}
        </Grid>
      ))}
    </Grid>
  );
};
