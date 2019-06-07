//@flow
export default function truncate(str: string, maxLength: number) {
  return str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;
}
