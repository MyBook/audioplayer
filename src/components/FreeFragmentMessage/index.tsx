import React, { ReactElement } from "react";
// import type { TrialMessageProps } from "utils/playerConstants";

type Props = {
  TrialMessage: ReactElement;
  name: string;
  id: number;
  bookLink: string;
};

export default function FreeFragmentMessage({
  TrialMessage,
  name,
  id,
  bookLink
}: Props) {
  return <TrialMessage name={name} bookLink={bookLink} id={id} />;
}
