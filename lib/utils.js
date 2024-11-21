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

export function calcDiscountPrice(originalPrice, discount) {
  return originalPrice - originalPrice * (discount / 100);
}

export function createOptionsFromData(
  dataList = [],
  labelTargetField = "name",
  valueTargetField = "id"
) {
  return dataList.map((item, index) => ({
    label: item[labelTargetField],
    value: "" + item[valueTargetField],
  }));
}

// Sanitize query params and return searched params
export function sanitizeParams(params) {
  // Initial params object
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}
