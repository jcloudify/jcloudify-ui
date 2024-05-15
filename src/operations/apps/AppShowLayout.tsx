import React from "react";
import {ShowBase, Title, useRecordContext} from "react-admin";
import {Outlet, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Tabs} from "@/components/tab";
import {colors} from "@/themes";

const tabList = ["Environments", "Deployments", "Analytics", "Logs"];

export const AppShowLayout: React.FC = () => {
  const {appId} = useParams();
  return (
    <Box>
      <ShowBase id={appId} resource="applications">
        <AppShowTitle />
      </ShowBase>

      <Box borderBottom={`1px solid ${colors("gray-0")}`}>
        <Tabs tabs={tabList} variant="scrollable" asLink />
      </Box>
      <Outlet />
    </Box>
  );
};

const AppShowTitle = () => {
  const app = useRecordContext();
  if (!app) return "";
  return <Title title={app.name} />;
};
