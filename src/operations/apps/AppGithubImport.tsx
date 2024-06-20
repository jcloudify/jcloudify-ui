import {Stack} from "@mui/material";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";

export const AppGithubImport: React.FC = () => {
  return (
    <Stack mb={2} p={2} justifyContent="center" width="100%" mx={0}>
      <Heading
        width={{xs: "100%", md: "60%"}}
        mb={4}
        title="Import Existing App From Github"
        subtitle="JCloudify enables you to effortlessly bootstrap a new application, which will be pushed to a GitHub repository of your choice. You can also directly import an existing Git repository."
      />
      <Stack spacing={3} width={{xs: "100%", md: "60%"}} mb={7}>
        <ImportGhRepository />
      </Stack>
    </Stack>
  );
};

const ImportGhRepository = () => {
  return (
    <ContainerWithHeading title="Import Git Repository">
      Tepr
    </ContainerWithHeading>
  );
};
