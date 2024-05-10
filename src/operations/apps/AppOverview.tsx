import {Show} from "react-admin";
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
import {ShowLayout} from "@/operations/components/show";

export const AppOverview: React.FC = () => {
  const {appId} = useParams();
  return (
    <Show title=" " id={appId} resource="applications">
      <ShowLayout>
        <AppOverviewView />
      </ShowLayout>
    </Show>
  );
};

const AppOverviewView: React.FC = () => {
  return <Box p={2}></Box>;
};
