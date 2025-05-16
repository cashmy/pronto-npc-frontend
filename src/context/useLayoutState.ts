import { useContext } from "react";
import { LayoutContext, LayoutContextProps } from "./LayoutContext";

export const useLayoutState = (): LayoutContextProps => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
};
