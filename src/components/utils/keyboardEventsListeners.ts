// @flow

type Functions = {
  triggerPlay: Function;
  handleForward: Function;
  handleBackward: Function;
  handleMute: Function;
};

function handleKeydown(e) {
  if (window.keydownFunctionsMapping[e.key]) {
    if (e.target.nodeName === "INPUT" && e.target.type === "text") {
      return;
    }
    e.preventDefault();
    window.keydownFunctionsMapping[e.key]();
  }
}

export default function(functions: Functions) {
  const { triggerPlay, handleForward, handleBackward, handleMute } = functions;
  window.keydownFunctionsMapping = {
    " ": triggerPlay,
    ArrowRight: handleForward,
    ArrowLeft: handleBackward,
    ь: handleMute,
    m: handleMute,
  };

  window.addEventListener("keydown", handleKeydown);
}

export function removeEventsListeners() {
  window.removeEventListener("keydown", handleKeydown);
}
