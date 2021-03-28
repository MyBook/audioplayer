import React, { Fragment } from "react";
import AudioBookIcon from "components/Icons/Audiobook";
import PodcastIcon from "components/Icons/Podcast";
import LectureIcon from "components/Icons/Lecture";

export default function TypeIcons(
  font_color: string,
  texts: { audiobook?: string; podcast?: string; lecture?: string },
) {
  return {
    audiobook: (
      <Fragment>
        <AudioBookIcon color={font_color} />
        {texts && texts.audiobook}
      </Fragment>
    ),
    podcast: (
      <Fragment>
        <PodcastIcon color={font_color} />
        {texts && texts.podcast}
      </Fragment>
    ),
    lecture: (
      <Fragment>
        <LectureIcon color={font_color} />
        {texts && texts.lecture}
      </Fragment>
    ),
  };
}
