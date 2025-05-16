/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, ReactNode } from "react";
import GridView from "./GridView";
import GridFooter from "./GridFooter";

type AppCardProps = {
  loading?: boolean;
  border?: boolean;
  footerProps?: {
    loading: boolean;
    footerText: string;
  };
  containerStyle?: CSSProperties;
  ListEmptyComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  data: any[];
  onEndReached?: () => void;
  renderRow: (item: any, index: number) => ReactNode;

  [x: string]: any;
};

const AppGrid: React.FC<AppCardProps> = ({
  footerProps,
  data = [],
  ...rest
}) => {
  return (
    <GridView
      data={data}
      {...rest}
      ListFooterComponent={
        footerProps ? (
          <GridFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppGrid;
