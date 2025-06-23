import { Button } from "antd";
import type { ButtonProps } from "antd";

export default function GlobalButton(props: ButtonProps) {
  return <Button {...props}>{props.children}</Button>;
}