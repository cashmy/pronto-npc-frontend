/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/velocity-react.d.ts
declare module "velocity-react" {
  import * as React from "react";

  // Based on Velocity.js options and your AnimationConfig
  interface VelocityAnimationProps {
    animation?: string | { [key: string]: any }; // Can be a UI pack string or a CSS properties object
    style?: React.CSSProperties;
    duration?: number;
    delay?: number;
    easing?: string | number[]; // e.g., "ease-in-out", [0.4, 0.0, 0.2, 1]
    stagger?: number;
    drag?: boolean;
    display?: string | null; // CSS display property after animation
    visibility?: string; // CSS visibility property after animation
    loop?: boolean | number;
    complete?: (elements: HTMLElement[]) => void;
    begin?: (elements: HTMLElement[]) => void;
    progress?: (
      elements: HTMLElement[],
      percentComplete: number,
      timeRemaining: number,
      timeStart: number,
      tweenValue?: number
    ) => void;
    // For UI pack specific options like 'backwards' from your AnimationConfig
    [key: string]: any;
  }

  export interface VelocityComponentProps extends VelocityAnimationProps {
    children: React.ReactNode;
  }

  export class VelocityComponent extends React.Component<VelocityComponentProps> {}

  export interface VelocityTransitionGroupProps {
    children?: React.ReactNode;

    enter?: VelocityAnimationProps | string | null;
    leave?: VelocityAnimationProps | string | null;
    appear?: VelocityAnimationProps | string | null;

    // Common props for transition groups or Velocity
    component?: React.ElementType | string; // e.g., "div", "ul"
    runOnMount?: boolean;
    easing?: string | number[]; // Default easing for transitions

    // Style applied before enter/leave animations and after
    enterHideStyle?: React.CSSProperties;
    enterShowStyle?: React.CSSProperties; // Note: velocity-react's default is {}
    leaveHideStyle?: React.CSSProperties; // Not explicitly in your code, but common
    leaveShowStyle?: React.CSSProperties; // Note: velocity-react's default is { display: 'none' }

    // Allow any other props that might be passed through
    [key: string]: any;
  }

  export class VelocityTransitionGroup extends React.Component<VelocityTransitionGroupProps> {}
}

// If you also get errors for "velocity-animate/velocity.ui",
// you can add a simple declaration for it too:
// declare module 'velocity-animate/velocity.ui';
