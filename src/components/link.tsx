import React from "react";
import {Link as RALink, LinkProps as RALinkProps} from "react-admin";
import {Box} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";

export const TopLink: React.FC<RALinkProps> = ({sx, ...props}) => {
  return (
    <RALink
      sx={{
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 2,
        ...sx,
      }}
      {...props}
    />
  );
};

export interface TypographyLink extends RALinkProps {
  disableOpenIcon?: boolean;
}

export const TypographyLink: React.FC<TypographyLink> = ({
  copiable,
  disableOpenIcon = false,
  noCopy = false,
  children,
  sx,
  ...rest
}) => {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap={0.5}
      sx={{
        ":hover": {
          textDecoration: "underline",
        },
      }}
    >
      <RALink
        {...rest}
        sx={{
          ...sx,
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {children || String(rest.to)}
        {!disableOpenIcon && rest.target === "_blank" && <OpenInNew />}
      </RALink>
    </Box>
  );
};
