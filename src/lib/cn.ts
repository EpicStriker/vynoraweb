import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** True for links that leave this site (opened in a new tab). */
export function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}
