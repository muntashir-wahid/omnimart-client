import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toKababCase(str, currentSeparator = "_") {
  return str.toLowerCase().split(currentSeparator).join("-");
}

export function userRedirectionHandler(role = "USER", router) {
  const redirectPanel = toKababCase(role);

  router.push(`/${redirectPanel}`);
}
