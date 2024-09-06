import React from "react";
import {Stack, Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Tabs, WithTab} from "@/components/tab";

const tabList = ["Events", "Outputs"];

export const StackShowLayout: React.FC = () => (
  <WithTab tab="Deployments">
    <Stack sx={{flexDirection: "row !important", width: "100%", p: 1}}>
      <Tabs
        tabs={tabList}
        orientation="vertical"
        variant="scrollable"
        sx={{
          "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          },
          "borderRight": 1,
          "borderColor": "divider",
        }}
        asLink
      >
        <Box role="tabpanel" px={2} flex={1}>
          <Outlet />
        </Box>
      </Tabs>
    </Stack>
  </WithTab>
);
