import {Application} from "@jcloudify-api/typescript-client";
import React from "react";
import {Title, useGetOne} from "react-admin";
import {Outlet, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Tabs} from "@/components/tab";
import {ToRecord} from "@/providers";

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
  const {appId} = useParams();
  const {data: app} = useGetOne<ToRecord<Application>>("applications", {
    id: appId!,
  });
  return <Title title={app?.name || "App"} />;
};
