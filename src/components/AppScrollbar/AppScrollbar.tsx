import React from "react";
import { styled } from "@mui/material/styles";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

type AppScrollbarProps = {
  children: React.ReactNode;
  className?: string;
  otherProps?: Record<string, unknown>;
};

const StyledSimpleBarReact = styled(SimpleBarReact)(() => ({
  height: "100%",
  width: "100%",
}));

const AppScrollbar: React.FC<AppScrollbarProps> = ({
  children,
  className,
  otherProps,
}) => {
  return (
    <StyledSimpleBarReact className={className} {...otherProps}>
      {children}
    </StyledSimpleBarReact>
  );
};

export default AppScrollbar;
