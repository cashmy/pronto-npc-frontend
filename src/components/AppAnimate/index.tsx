import React, { memo, useState, useEffect } from "react";
import { Slide, Box, SlideProps } from "@mui/material";

type AppAnimateProps = {
  children: React.ReactNode;
  animation?: string; // e.g., "transition.slideDownIn"
  delay?: number; // Delay in milliseconds
  duration?: number; // Optional: Duration of the animation
};

const AppAnimate: React.FC<AppAnimateProps> = (props) => {
  const {
    children,
    animation = "transition.slideDownIn", // Default animation
    delay = 0, // Default delay
    duration = 300, // Default duration
  } = props;
  const [isIn, setIsIn] = useState(false); // State to control the 'in' prop

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    // Set a timer to change 'isIn' state after the specified delay
    if (delay > 0) {
      timer = setTimeout(() => {
        setIsIn(true);
      }, delay);
    } else {
      setIsIn(true); // If no delay, set 'in' immediately
    }

    // Cleanup function to clear the timer if the component unmounts before the timer fires
    return () => clearTimeout(timer);
  }, [delay]); // Dependency array ensures effect runs if delay changes

  // If there are no children, don't render the Slide component
  if (!children) {
    return null;
  }

  // Parse animation string to get direction
  const directionMatch = animation.match(/slide(\w+)In/i);
  const direction: SlideProps["direction"] = directionMatch
    ? (directionMatch[1].toLowerCase() as SlideProps["direction"])
    : "down"; // Default direction if parsing fails

  // Basic validation for direction (optional but good practice)
  const validDirections: SlideProps["direction"][] = [
    "left",
    "right",
    "up",
    "down",
  ];
  if (!validDirections.includes(direction)) {
    console.warn(
      `AppAnimate: Invalid direction parsed from animation "${animation}". Defaulting to "down".`
    );
    return null;
  }
  return (
    <>
      <Slide
        in={isIn} // Control the animation trigger with the state
        direction={direction}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: duration, exit: duration }}
      >
        {/* Wrap children in a Box to ensure Slide has a single element child */}
        <Box>{children}</Box>
      </Slide>
    </>
  );
};
export default memo(AppAnimate);
