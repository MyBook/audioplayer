//@flow
import React from "react";
import type { ComponentType } from "react";
import type { TrialMessageProps } from "utils/playerConstants";

type Props = {
  TrialMessage: ComponentType<TrialMessageProps>,
  name: string,
  id: number,
  bookLink: string,
};

export default function FreeFragmentMessage({
  TrialMessage,
  name,
  id,
  bookLink,
}: Props) {
  return <TrialMessage name={name} bookLink={bookLink} id={id} />;
}
