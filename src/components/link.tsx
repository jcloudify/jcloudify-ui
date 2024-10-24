import React from "react";
import {Link as RALink, LinkProps as RALinkProps} from "react-admin";
import {Box} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import {CopyToClipboard} from "@/components/copy";

export const TopLink: React.FC<RALinkProps & {index?: number}> = ({
  sx,
  index = 10,
  ...props
}) => {
  return (
    <RALink
      sx={{
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: index,
        ...sx,
      }}
      {...props}
    />
  );
};

export interface TypographyLink extends RALinkProps {
  copiable?: boolean;
  disableOpenIcon?: boolean;
}

export const TypographyLink: React.FC<TypographyLink> = ({
  copiable = true,
  disableOpenIcon = false,
  noCopy = false,
  children,
  sx,
  ...rest
}) => {
  return (
    <Box display="inline-flex" alignItems="center" gap={0.5}>
      {copiable && <CopyToClipboard size="small" text={rest.to as string} />}
      <RALink
        {...rest}
        sx={{
          ...sx,
          "display": "inline-flex",
          "alignItems": "center",
          "gap": 0.5,
          ":hover": {
            textDecoration: "underline",
          },
        }}
      >
        {children || String(rest.to)}
        {!disableOpenIcon && rest.target === "_blank" && <OpenInNew />}
      </RALink>
    </Box>
  );
};
