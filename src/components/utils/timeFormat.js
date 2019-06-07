export default function timeFormat(sec) {
  const rawSeconds = sec.toFixed ? sec.toFixed() : sec;
  const hours = ~~(rawSeconds / 3600);
  const minutes = ~~((rawSeconds % 3600) / 60);
  const seconds = ~~rawSeconds % 60;
  let result = "";

  result += "" + hours + ":" + (minutes < 10 ? "0" : "");
  result += "" + minutes + ":" + (seconds < 10 ? "0" : "");
  result += "" + seconds;

  return result;
}
