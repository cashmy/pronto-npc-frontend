/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, ReactNode } from "react";
import { useTheme } from "@mui/material";
import AppAnimateGroup from "../AppAnimateGroup";
import useBottomScrollListener from "../../hooks/useBottomScrollListener.tsx";

type ListViewProps = {
  border?: boolean;
  renderRow: (item: any, index: number) => ReactNode;
  delay?: number;
  duration?: number;
  animation?: string;
  containerStyle?: CSSProperties;
  ListEmptyComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  data: any[];
  onEndReached?: () => void;
};

const getEmptyContainer = (ListEmptyComponent: any) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent: any) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};
const ListView = ({
  renderRow,
  containerStyle,
  ListFooterComponent,
  ListEmptyComponent,
  border = false,
  animation = "transition.slideUpIn",
  data = [],
  delay = 0,
  duration = 200,
  onEndReached = () => {},
  ...rest
}: ListViewProps) => {
  const theme = useTheme();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: "hidden",
  };

  if (!onEndReached) {
    onEndReached = () => {};
  }

  let style = containerStyle;
  if (border) {
    style = { ...style, ...borderStyle };
  }
  useBottomScrollListener(onEndReached, { debounce: 200 });
  return (
    <div style={{ ...style }}>
      <AppAnimateGroup {...rest} enter={{ delay, duration, animation }}>
        {data.length > 0
          ? data.map((item, index) => renderRow(item, index))
          : getEmptyContainer(ListEmptyComponent)}
        {getFooterContainer(ListFooterComponent)}
      </AppAnimateGroup>
    </div>
  );
};

export default ListView;
