import {
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {GitHub as GitHubIcon, Search as SearchIcon} from "@mui/icons-material";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {ghOrg} from "#/github.mock";

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
      <Stack direction="row" spacing={2}>
        <Select fullWidth defaultValue={ghOrg[0].id}>
          {ghOrg.map((org) => (
            <MenuItem value={org.id} key={`org-${org.id}`}>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              {org.username}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Search"
          size="medium"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </ContainerWithHeading>
  );
};
