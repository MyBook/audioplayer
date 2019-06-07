// @flow
type name =
  | "onPlay"
  | "onPause"
  | "onForward"
  | "onBackward"
  | "onChangeVolume"
  | "onMute"
  | "onChangeTempo"
  | "onOpenTempo"
  | "onChangeChapter"
  | "onOpenTableOfContents"
  | "onKeyMute"
  | "onKeyForward"
  | "onKeyBackward"
  | "onKeyPause"
  | "onKeyPlay";

export default function tracking(name: name) {
  if (global.IS_BROWSER) {
    window.player.trackingFunctions &&
      window.player.trackingFunctions[name] &&
      window.player.trackingFunctions[name]();
  }
}
