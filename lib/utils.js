import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function userRedirectionHandler(role = "USER", router) {
  const redirectPanel = role.toLowerCase();

  router.push(`/${redirectPanel}`);
}
