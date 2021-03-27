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
  | "onKeyPlay"
  | "onTurnOffOnTrial"
  | "onTurnOffOnTableOfContent";

export default function tracking(name: name) {
  if (global.IS_BROWSER) {
    window.player &&
      window.player.trackingFunctions &&
      window.player.trackingFunctions[name] &&
      window.player.trackingFunctions[name]();
  }
}
