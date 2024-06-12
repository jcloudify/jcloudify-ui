import React from "react";
import {Grid, GridProps} from "@mui/material";

export type GridLayoutProps = {
  children: React.ReactNode;
} & Pick<GridProps, "sx" | "xs" | "sm" | "lg" | "md" | "spacing">;

export const getOffset = (col: number) => {
  return 12 / col;
};

/**
 * UNFINISHED
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  sx,
  sm,
  xs,
  md,
  lg,
}) => {
  return (
    <Grid container spacing={1} sx={sx}>
      {React.Children.map(children, (node) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
          {node}
        </Grid>
      ))}
    </Grid>
  );
};
