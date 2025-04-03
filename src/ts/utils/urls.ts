import type { dictionary } from "@types";

/**
 * Defines the path to the static assets folder 
 */
const static_folder = "./public";

/**
 * Navigates to a specified URL with optional query parameters and target.
 *
 * @param {string} href The base URL to navigate to.
 * @param {dictionary<string>} params An optional dictionary of query parameters to append to the URL.
 */
export const visit = (href: string, params: dictionary<string> = {}): void => {
  const url = new URL(href);
  for (const key in params) url.searchParams.set(key, params[key]);

  window.open(url, "_top");
};

/**
 * Validates whether a given string is a valid URL.
 *
 * @param {string} text The string to validate.
 * @returns {boolean} `true` if the string is a valid URL, otherwise `false`.
 * @example
 * isURL("example.com") => true
 * isURL("https://example.com") => true
 * isURL("ftp://example.com") => true
 * isURL("192.168.1.1") => true
 * @example
 * isURL("Hi, I am Mohamed!") => false
 * isURL("https://example .com") => false
 * isURL("localhost") => false
 */
export const isURL = (text: string): boolean =>
  /^([A-z]+:\/\/)?(([A-z]+\.)?[A-z0-9\-_]+\.[A-z]+|[0-9+\.]+(:[0-9]+))([\/\?#].*)?$/.test(
    text
  );

/**
 * Generates the full pathname for a website's favicon.
 *
 * @param {string} domain The website domain.
 * @returns {string} The full path to the favicon image.
 */
export const favicon = (domain: string): string =>
  `${static_folder}/imgs/favicons/${domain}.png`;

