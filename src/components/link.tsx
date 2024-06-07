import {Link, LinkProps} from "react-admin";

export const TopLink: React.FC<LinkProps> = ({sx, ...props}) => {
  return (
    <Link
      sx={{
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 2,
        ...sx,
      }}
      {...props}
    />
  );
};
