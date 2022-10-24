import { ComponentChildren } from "preact";

type TitleProps = {
  children?: ComponentChildren;
};

export function Title({ children }: TitleProps) {
  return children
    ? (
      <title>
        {children}
        {" · FaaS3"}
      </title>
    )
    : (
      <title>
        {"FaaS3 · FaaS Based on Blockchain toolkit for Web3 developers"}
      </title>
    );
}
