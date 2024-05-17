import {Title} from "react-admin";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import {Tabs} from "@/components/tab";
import {colors} from "@/themes";

const tabList = ["Import", "From-scratch"];

export const AppCreateLayout: React.FC = () => (
  <Box>
    <Title title="Create an app" />
    <Box borderBottom={`1px solid ${colors("gray-0")}`}>
      <Tabs variant="scrollable" tabs={tabList} asLink />
    </Box>
    <Outlet />
  </Box>
);
