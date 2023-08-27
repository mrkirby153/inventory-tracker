import { classes, conditionallyAddClass } from "@app/utils";
import { forwardRef } from "react";

export enum ButtonStyle {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: ButtonStyle;
}

const colors = {
  [ButtonStyle.Primary]: "bg-blue-500 hover:bg-blue-600",
  [ButtonStyle.Secondary]: "bg-gray-500 hover:bg-gray-600",
  [ButtonStyle.Success]: "bg-green-500 hover:bg-green-600",
  [ButtonStyle.Danger]: "bg-red-500 hover:bg-red-600",
};

const disabledColors = {
  [ButtonStyle.Primary]: "bg-blue-300 cursor-not-allowed",
  [ButtonStyle.Secondary]: "bg-gray-300 cursor-not-allowed",
  [ButtonStyle.Success]: "bg-green-300 cursor-not-allowed",
  [ButtonStyle.Danger]: "bg-red-300 cursor-not-allowed",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, buttonStyle, ...rest } = props;
  const actualClasses = classes(
    className || "",
    "py-2 px-4 text-white rounded",
    conditionallyAddClass(
      props.disabled,
      disabledColors[buttonStyle],
      colors[buttonStyle],
    ),
    "inline-block",
  );
  return <button className={actualClasses} ref={ref} {...rest} />;
});
Button.displayName = "Button";

export default Button;
