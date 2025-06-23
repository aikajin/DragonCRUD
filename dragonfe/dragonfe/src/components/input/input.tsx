import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

const GlobalInput: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};

export default GlobalInput;