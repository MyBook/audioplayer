export default function debounce(fn: any, time = 1000) {
  let timeout: NodeJS.Timeout;

  return function() {
    // @ts-ignore
    const functionCall = () => fn.apply(this, arguments);

    if (typeof timeout !== "undefined") {
      clearTimeout(timeout);
    }
    timeout = setTimeout(functionCall, time ? time : 1000);
  };
}
