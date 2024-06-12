import {useState} from "react";
import {IconButton, IconButtonProps} from "@mui/material";
import {ContentCopy, Check} from "@mui/icons-material";

export type CopyToClipboardProps = {
  text: string;
} & Pick<IconButtonProps, "size" | "sx">;

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  ...rest
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const _resetCopiedStateAfterDelay = () => {
    const id = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(id);
    }, 1000 * 3);
  };

  const doCopy = async () => {
    await copyTextToClipboard(text);
    setIsCopied(true);
    _resetCopiedStateAfterDelay();
  };

  return (
    <IconButton onClick={doCopy} disabled={isCopied} {...rest}>
      {isCopied ? <Check /> : <ContentCopy />}
    </IconButton>
  );
};

export const copyTextToClipboard = (text: string) =>
  navigator.clipboard.writeText(text);
