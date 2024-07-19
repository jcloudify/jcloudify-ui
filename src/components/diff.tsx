import "@/themes/prism/github-light.css";

import ReactDiffViewer, {
  DiffMethod,
  ReactDiffViewerProps,
} from "react-diff-viewer-continued";

export type DiffViewerProps = Pick<
  ReactDiffViewerProps,
  "oldValue" | "newValue" | "leftTitle" | "rightTitle" | "renderContent"
> & {
  highlight: (s: string) => string;
};

export const DiffViewer: React.FC<DiffViewerProps> = ({highlight, ...rest}) => {
  return (
    <ReactDiffViewer
      styles={{
        variables: {
          light: {
            diffViewerTitleBackground: "#fff",
          },
        },
      }}
      compareMethod={DiffMethod.WORDS}
      renderContent={(s = "") => (
        <pre
          style={{display: "inline"}}
          dangerouslySetInnerHTML={{
            __html: highlight(s || ""),
          }}
        />
      )}
      {...rest}
    />
  );
};
