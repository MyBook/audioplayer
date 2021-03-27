import React from "react";
import { Loader as LoaderStyled, Line } from "components/Loader/styled";

type Props = {
  className?: string;
  color?: string;
};

export default function Loader({ className, color = "#fff" }: Props) {
  return (
    <LoaderStyled className={className} color={color}>
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
    </LoaderStyled>
  );
}
