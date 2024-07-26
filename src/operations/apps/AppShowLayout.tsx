import React from "react";
import {Title} from "react-admin";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import {Tabs} from "@/components/tab";

const tabList = ["Environments", "Deployments", "Monitoring", "Logs"];

export const AppShowLayout: React.FC = () => {
  return (
    <Box>
      <AppShowTitle />

      <Box>
        <Tabs tabs={tabList} variant="scrollable" asLink>
          <Outlet />
        </Tabs>
      </Box>
    </Box>
  );
};

const AppShowTitle = () => {
  // TODO: when get_app_by_id is implemented
  // const app = useRecordContext();
  // if (!app) return "";
  return <Title title="lambda" />;
};
