import {memo, useMemo} from "react";
import {Box, Stack} from "@mui/material";
import {colors} from "@/themes";
import {CopyToClipboard} from "./copy";

export interface LineProps {
  content: string;
  lineNumber: number;
  enableLineNumber?: boolean;
}

const Line: React.FC<LineProps> = ({content, lineNumber, enableLineNumber}) => (
  <Stack
    direction="row"
    alignItems="flex-start"
    sx={{
      "px": 1,
      "&:hover": {
        bgcolor: colors("gray-1"),
      },
    }}
  >
    {enableLineNumber && <Box mr={1}>{lineNumber}</Box>}
    <Box>{content}</Box>
  </Stack>
);

export interface TerminalLogProps {
  text: string;
  height?: string;
  width?: string;
  enableLineNumber?: boolean;
}

const TerminalLogComponent: React.FC<TerminalLogProps> = ({
  text,
  width,
  height,
  enableLineNumber = false,
}) => {
  const lines = useMemo(() => text.split("\n"), [text]);
  return (
    <Stack
      direction="column"
      spacing={0.7}
      sx={{
        "py": 1,
        "bgcolor": colors("gray-0"),
        "color": "#121212",
        "fontFamily": "consolas",
        "fontSize": "1.1rem",
        "border": `1px solid ${colors("gray-1")}`,
        "borderRadius": "4px",
        "overflowY": "auto",
        "position": "relative",
        width,
        height,
        "&::-webkit-scrollbar": {
          width: "5px",
          bgcolor: colors("gray-1"),
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "#000",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <CopyToClipboard
          text={text}
          sx={{
            "border": `1px solid ${colors("gray-1")}`,
            "bgcolor": colors("gray-0"),
            "ml": 1,
            ":hover, :disabled": {
              bgcolor: colors("gray-0"),
            },
          }}
        />
      </Box>

      {lines.map((line, idx) => (
        <Line
          key={"line" + idx}
          content={line}
          lineNumber={idx + 1}
          enableLineNumber={enableLineNumber}
        />
      ))}
    </Stack>
  );
};

export const TerminalLog = memo(TerminalLogComponent);
