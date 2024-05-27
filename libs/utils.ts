import db from "./db";

export function formatToTimeAge(date: Date): string {
  const time = new Date(date).getTime()
  const now = new Date().getTime()
  const diff = (time - now) / (1000 * 60 * 60 * 24)

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(Math.floor(diff), "days")
}

export function formatToWon(price: number) {
  return price.toLocaleString("ko-KR");
}