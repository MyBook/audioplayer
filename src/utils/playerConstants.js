//@flow
export const defaultForwardSecondsCount = 30;
export const defaultHorizontalSliderWidth = 205;

export type Book = {
  id: number,
  name: string,
  bookLink: string,
  default_image: string,
};

export type TrialMessageProps = {
  name: string,
  bookLink: string,
};

export type styles = {
  almostWhite: string,
  primary: string,
  gray: string,
  borderRadius: string,
};

export type trackingFunctions = {
  onPlay: Function,
  onPause: Function,
  onForward: Function,
  onBackward: Function,
  onChangeVolume: Function,
  onMute: Function,
  onChangeTempo: Function,
  onOpenTempo: Function,
  onChangeChapter: Function,
  onOpenTableOfContents: Function,
  onKeyMute: Function,
  onKeyForward: Function,
  onKeyBackward: Function,
  onKeyPause: Function,
  onKeyPlay: Function,
};
