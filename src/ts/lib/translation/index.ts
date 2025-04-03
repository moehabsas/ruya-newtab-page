import type { dictionary } from "@types";
import ar from "./locales/ar.js";
import en from "./locales/en.js";

const locale_key = "lang";
const def_locale = "en";
const trans: dictionary<dictionary<string>> = { ar, en };

let cur_locale: string = def_locale;

/**
 * Use the translation by setting the language and direction attributes
 * and translating the entire document.
 *
 * @param {string | null} [locale=localStorage.getItem(locale_key)] - The target locale.
 * @returns {void}
 */
export default function use_translation(
  locale: string | null = localStorage.getItem(locale_key)
): void {
  cur_locale = locale && trans[locale] ? locale : def_locale;

  document.documentElement.setAttribute("lang", cur_locale);
  document.body.setAttribute("dir", cur_locale === "ar" ? "rtl" : "ltr");

  document.querySelectorAll("[data-msid]").forEach((elem) => {
    const msid = elem.getAttribute("data-msid") as string;
    const msargs = elem.getAttribute("data-msargs")?.split(",") || [];
    const txt = _t(msid, msargs);

    if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
      elem.setAttribute("placeholder", txt);
    } else {
      elem.textContent = txt;
    }
  });
}

/**
 * Get message text using the current locale.
 *
 * @param {string} msid - The message ID to get translation.
 * @param {string[]} [msargs=[]] - Optional arguments to replace placeholders in the message.
 * @returns {string} - The message or the original message id if no message is found.
 */
export const _t = (msid: string, msargs: string[] = []): string => {
  const mes = (trans[cur_locale] || trans[def_locale] || {})[msid];
  if (!mes) return msid;

  return msargs
    ? mes.replace(/\$(\d+)/g, (_, i) => msargs[i] || "...")
    : mes;
};

/**
 * Changes the locale and updates the translations dynamically.
 *
 * @param {string} new_locale - The new locale to set.
 * @throws {Error} If the provided locale is invalid.
 * @returns {void}
 */
export const change_locale = (new_locale: string): void => {
  if (!(new_locale && trans[new_locale]))
    throw new Error(`'${new_locale}' is invalid locale.`);

  use_translation(new_locale);
  localStorage.setItem(locale_key, new_locale);
};
