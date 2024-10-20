import {Link} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Commit} from "@mui/icons-material";
import {FaCodeBranch as Branch} from "react-icons/fa";
import {getURLComponent, githubURLFactory} from "@/utils/github_url";
import {AppEnvDeployment} from "@jcloudify-api/typescript-client";

export type VCSProps = Required<AppEnvDeployment>["github_meta"] & {
  showCommitMsg?: boolean;
};

export const VCS: React.FC<VCSProps> = ({
  repo,
  commit,
  showCommitMsg = true,
}) => {
  const url = getURLComponent(repo?.owner_name!, repo?.name!);
  return (
    <Stack>
      <Stack direction="row" spacing={0.5}>
        <Branch size="18px" />
        <Typography
          flex={1}
          target="_blank"
          component={Link}
          to={url.branch(commit?.branch!)}
        >
          {commit?.branch}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={0.5}
        component={Link}
        sx={{textDecoration: "none"}}
        to={url.commit(commit?.sha!)}
      >
        <Commit />
        <Stack direction="row" spacing={1}>
          <Typography fontWeight="520">{commit?.sha?.slice(0, 7)}</Typography>
          {showCommitMsg && (
            <Typography color="text.secondary" fontWeight="500" flex={1}>
              {commit?.message}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export type GitCommitProps = Required<AppEnvDeployment>["github_meta"];

export const GitCommit: React.FC<GitCommitProps> = ({repo, commit}) => {
  const url = getURLComponent(repo?.owner_name!, repo?.name!);
  return (
    <Stack
      direction="row"
      spacing={1}
      component={Link}
      sx={{textDecoration: "none"}}
      to={url.commit(commit?.sha!)}
    >
      <Typography fontWeight="520">{commit?.sha?.slice(0, 7)}</Typography>
      <Typography color="text.secondary" fontWeight="500" flex={1}>
        {commit?.message}
      </Typography>
    </Stack>
  );
};

export const GitBranch: React.FC<{
  githubRepoURL: string;
  branchName: string;
}> = ({githubRepoURL, branchName}) => (
  <Stack direction="row" spacing={0.5}>
    <Branch size="18px" />
    <Typography
      flex={1}
      target="_blank"
      component={Link}
      to={githubURLFactory(githubRepoURL).branch(branchName)}
    >
      {branchName}
    </Typography>
  </Stack>
);
