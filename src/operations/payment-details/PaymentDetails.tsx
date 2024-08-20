import {IconButtonWithTooltip} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {Settings as SettingsIcon} from "@mui/icons-material";
import React from "react";

export const PaymentDetails: React.FC = () => {
  return (
    <Box>
      Aliqua nulla sint ex ipsum. Occaecat laboris irure enim voluptate. Qui
      duis deserunt proident anim amet enim. Ut minim nulla veniam proident sunt
      non Lorem ex duis velit. Laborum labore sit culpa laboris cupidatat nulla
      quis velit exercitation cillum. Officia nisi ullamco ullamco dolor
      cupidatat consectetur do in consequat excepteur. Sint sint ex ullamco
      aliquip occaecat reprehenderit pariatur fugiat proident commodo. Laboris
      cupidatat cupidatat id dolor in nulla esse aliquip culpa commodo dolor
      adipisicing excepteur sint. Ut aliqua sint commodo occaecat ex quis
      occaecat eu adipisicing exercitation do sit.
    </Box>
  );
};

export const PaymentDetailsSummary: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="h6">Payment details</Typography>
        <IconButtonWithTooltip
          label="Manage Payment Details"
          onClick={() => navigate(`/billing/payment-details`)}
        >
          <SettingsIcon fontSize="small" />
        </IconButtonWithTooltip>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Typography variant="body1">Name of customer</Typography>
        <Typography variant="body1">Email of customer</Typography>
        <Typography variant="body1">Phone of customer</Typography>
      </Stack>
    </Stack>
  );
};
