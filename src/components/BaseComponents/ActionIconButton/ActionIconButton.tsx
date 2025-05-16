import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import getTextContrast from "../../../helpers/getTextContrast";
import { Disabled } from "../ActionButton/ActionButton.stories";

interface ActionIconButtonProps extends IconButtonProps {
  color?: IconButtonProps["color"]; // Button color
  // backgroundColor?: string; // Optional background color
  children: React.ReactNode; // Button content
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional click handler
  tooltipText?: string; // Optional tooltip text
  filled?: boolean; // Whether the button is filled
}

const ActionIconButton: React.FC<ActionIconButtonProps> = (props) => {
  const {
    color,
    // backgroundColor,
    children,
    onClick,
    tooltipText,
    filled = false,
    ...other
  } = props;

  return (
    <>
      {tooltipText && !Disabled ? (
        <Tooltip title={tooltipText} placement="top">
          <IconButton
            sx={{ minWidth: 0, margin: 0.5, mr: 2, p: 1 }}
            style={
              filled
                ? {
                    backgroundColor: props.color,
                    color: getTextContrast.getTextContrast(
                      props.color || "#000000"
                    ),
                  }
                : { color: color }
            }
            onClick={onClick}
            {...other}
          >
            {children}
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton
          style={
            filled
              ? {
                  backgroundColor: props.color,
                  color: getTextContrast.getTextContrast(
                    props.color || "#000000"
                  ),
                }
              : { color: color }
          }
          onClick={onClick}
          {...other}
        >
          {children}
        </IconButton>
      )}
    </>
  );
};

export default ActionIconButton;
