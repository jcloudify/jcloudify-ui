import React from "react";
import {Box, Paper} from "@mui/material";
import {Tabs} from "@/components/tab";
import {Outlet} from "react-router-dom";

const tabList = ["Overview", "Deployments", "Analytics", "Logs"];

export const AppShowLayout: React.FC = () => {
  return (
    <Box>
      <Paper>
        <Tabs tabs={tabList} asLink />
      </Paper>
      <Outlet />
    </Box>
  );
};
