// @flow

type Functions = {
  triggerPlay: Function,
  handleForward: Function,
  handleBackward: Function,
  handleMute: Function,
};

export default function(functions: Functions) {
  const { triggerPlay, handleForward, handleBackward, handleMute } = functions;
  const mapping = {
    " ": triggerPlay,
    ArrowRight: handleForward,
    ArrowLeft: handleBackward,
    ь: handleMute,
    m: handleMute,
  };

  window.addEventListener("keydown", e => {
    if (mapping[e.key]) {
      if (e.target.nodeName === "INPUT" && e.target.type === "text") {
        return;
      }
      e.preventDefault();
      mapping[e.key]();
    }
  });
}
