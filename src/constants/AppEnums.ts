export const ThemeStyle = {
  MODERN: "modern",
  STANDARD: "standard",
};
export const ThemeStyleRadius = {
  MODERN: 30,
  STANDARD: 16,
};
export enum RoutePermittedRole {
  Admin = "admin",
  User = "user",
}
export enum RouteType {
  Public = "public",
  Private = "private",
  Auth = "auth",
  Restricted = "restricted",
}
export const Fonts = {
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600",
  BOLD: "700",
};

export enum NavStyle {
  DEFAULT = "default",
  BIT_BUCKET = "bit_bucket",
  STANDARD = "standard",
  DRAWER = "drawer",
  MINI = "mini",
  MINI_SIDEBAR_TOGGLE = "mini-sidebar-toggle",
  HEADER_USER = "user-header",
  HEADER_USER_MINI = "user-mini-header",
  H_DEFAULT = "h-default",
  HOR_HEADER_FIXED = "hor-header-fixed",
  HOR_DARK_LAYOUT = "hor-dark-layout",
}

// TODO: Consider removing this after cleanup of unused CREMA components
export const LayoutDirection = {
  RTL: "rtl",
  LTR: "ltr",
};
export const FooterType = {
  FIXED: "fixed",
  FLUID: "fluid",
};
export const HeaderType = {
  FLUID: "fluid",
  FIXED: "fixed",
};
export const RouteTransition = {
  NONE: "none",
  alpha: "alpha",
  SLIDE_LEFT: "slideLeft",
  SLIDE_RIGHT: "slideRight",
  SLIDE_UP: "slideUp",
  SLIDE_DOWN: "slideDown",
};
export const ThemeMode = {
  LIGHT: "light",
  DARK: "dark",
};
export enum LayoutType {
  FULL_WIDTH = "full-width",
  BOXED = "boxed",
  FRAMED = "framed",
}
export enum MenuStyle {
  DEFAULT = "default",
  STANDARD = "standard",
  ROUNDED = "rounded",
  ROUNDED_REVERSE = "rounded-reverse",
  CURVED_MENU = "curved-menu",
}
