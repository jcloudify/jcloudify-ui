import {
  Avatar,
  Button,
  Divider,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {GitHub as GitHubIcon, Search as SearchIcon} from "@mui/icons-material";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {fromToNow} from "@/utils/date";

import {ghOrg, ghRepository} from "#/github.mock";

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
      <Stack direction="column" spacing={2}>
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
        <Stack direction="column" spacing={1}>
          {ghRepository.map((repo) => (
            <RepositoryView repo={repo} key={`repo-${repo.id}`} />
          ))}
        </Stack>
      </Stack>
    </ContainerWithHeading>
  );
};

const RepositoryView: React.FC<{repo: any}> = ({repo}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      p={2}
      component={Paper}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar>
          <GitHubIcon />
        </Avatar>
        <Typography variant="h6">{repo.name}</Typography>
        <Typography variant="body2">{fromToNow(repo.created_at)}</Typography>
      </Stack>
      <Button variant="contained">Import</Button>
    </Stack>
  );
};
