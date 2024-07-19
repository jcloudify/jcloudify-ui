import {Environment} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {useGetList} from "react-admin";
import {Select, MenuItem, SelectChangeEvent} from "@mui/material";
import Prism from "prismjs";
import "@/themes/prism/github-light.css";
import DiffViewer, {DiffMethod} from "react-diff-viewer-continued";
import {ToRecord} from "@/providers";

export const EnvironmentDiff: React.FC<{appId: string}> = ({appId}) => {
  const [environmentPair, setEnvironmentPair] = useState<
    [Environment, Environment]
  >([] as any);

  const {data: environments = []} = useGetList<ToRecord<Environment>>(
    "environments",
    {meta: {application_id: appId}}
  );

  const setEnvironment = (ev: SelectChangeEvent<string>, idx: number) => {
    const id = ev.target.value;
    const newEnvironmentPair = [...environmentPair] as [
      Environment,
      Environment,
    ];
    newEnvironmentPair[idx] = environments.find(
      (environment) => environment.id === id
    )!;
    setEnvironmentPair(newEnvironmentPair);
  };

  const [conf1, conf2] = environmentPair;

  return (
    <DiffViewer
      compareMethod={DiffMethod.WORDS}
      leftTitle={
        <Select<string> onChange={(ev) => setEnvironment(ev, 0)} size="small">
          {environments.map((environment) => (
            <MenuItem key={environment.id} value={environment.id}>
              {environment.environment_type}
            </MenuItem>
          ))}
        </Select>
      }
      rightTitle={
        <Select<string> onChange={(ev) => setEnvironment(ev, 1)} size="small">
          {environments.map((environment) => (
            <MenuItem key={environment.id} value={environment.id}>
              {environment.environment_type}
            </MenuItem>
          ))}
        </Select>
      }
      oldValue={conf1 ? toPrettyJSON(conf1) : ""}
      newValue={conf2 ? toPrettyJSON(conf2) : ""}
      renderContent={highlightJSON}
    />
  );
};

Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true,
    inside: {
      operator: /"/,
    },
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
    inside: {
      operator: /"/,
    },
  },

  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true,
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,

  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword",
  },
};

const highlightJSON = (s: string) => (
  <pre
    style={{display: "inline"}}
    dangerouslySetInnerHTML={{
      __html: Prism.highlight(s || "", Prism.languages.json, "json"),
    }}
  />
);

const toPrettyJSON = (o: any) => {
  return JSON.stringify(o, null, 2);
};
