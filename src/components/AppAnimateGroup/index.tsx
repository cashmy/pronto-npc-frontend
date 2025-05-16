// import React, { memo } from "react";
// import { VelocityTransitionGroup } from "velocity-react";
// import "velocity-animate/velocity.ui";

// interface AnimationConfig {
//   delay?: number;
//   duration?: number;
//   animation?: string;
//   stagger?: number;
//   display?: string | null;
//   visibility?: string;
//   backwards?: number;
// }
// type AppAnimateGroupProps = {
//   enter?: AnimationConfig;
//   leave?: AnimationConfig;
//   children: React.ReactNode;
// };

// const enterAnimationDefaults = {
//   delay: 0,
//   duration: 200,
//   animation: "transition.fadeIn",
//   stagger: 50,
//   display: null,
//   visibility: "visible",
// };

// const leaveAnimationDefaults = {
//   delay: 0,
//   duration: 200,
//   animation: "transition.slideUpOut",
//   display: null,
//   visibility: "visible",
//   backwards: 150,
// };

// const AppAnimateGroup = ({ ...props }: AppAnimateGroupProps) => {
//   return (
//     <VelocityTransitionGroup
//       {...props}
//       enter={{ ...enterAnimationDefaults, ...props.enter }}
//       leave={{ ...leaveAnimationDefaults, ...props.leave }}
//     />
//   );
// };

// AppAnimateGroup.defaultProps = {
//   enter: enterAnimationDefaults,
//   leave: leaveAnimationDefaults,
//   easing: [0.4, 0.0, 0.2, 1],
//   runOnMount: true,
//   enterHideStyle: {
//     visibility: "visible",
//   },
//   enterShowStyle: {
//     visibility: "hidden",
//   },
// };

// export default memo(AppAnimateGroup);

import React, { memo } from "react";
import Box from "@mui/material/Box";

type AppAnimateProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

const AppAnimateGroup: React.FC<AppAnimateProps> = (props) => {
  return <Box {...props}>{props.children}</Box>;
};
export default memo(AppAnimateGroup);
