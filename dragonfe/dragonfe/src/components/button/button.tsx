import { Button } from "antd";
import type { ButtonProps } from "antd";
import React from "react";

const GlobalButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default GlobalButton;