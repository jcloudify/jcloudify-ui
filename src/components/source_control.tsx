import {Link} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Commit} from "@mui/icons-material";
import {FaCodeBranch as Branch} from "react-icons/fa";
import {TODO_Deployment} from "@/services/poja-api";
import {getURLComponent} from "@/utils/github_url";

export type VCSProps = TODO_Deployment["github_meta"];

export const VCS: React.FC<VCSProps> = ({
  org,
  repo,
  commit_branch,
  commit_sha,
  commit_message,
}) => {
  const url = getURLComponent(org, repo);
  return (
    <Stack>
      <Stack direction="row" spacing={0.5}>
        <Branch size="18px" />
        <Typography
          flex={1}
          target="_blank"
          component={Link}
          zIndex={3}
          to={url.branch(commit_branch)}
        >
          {commit_branch}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={0.5}
        component={Link}
        zIndex={3}
        to={url.commit(commit_sha)}
      >
        <Commit />
        <Stack direction="row" spacing={1}>
          <Typography fontWeight="520">{commit_sha.slice(0, 7)}</Typography>
          <Typography color="text.secondary" fontWeight="500" flex={1}>
            {commit_message}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
