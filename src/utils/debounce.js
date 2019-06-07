export default function debounce(fn, time = 1000) {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    if (typeof timeout !== "undefined") {
      clearTimeout(timeout);
    }
    timeout = setTimeout(functionCall, time ? time : 1000);
  };
}
