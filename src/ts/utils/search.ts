import type { dictionary } from "@types";
import { visit, favicon, isURL } from "./urls.js";

export interface Searcher extends HTMLFormElement {
  mode: "text" | "url";
  /**
   * Search input.
   */
  readonly query: HTMLInputElement;
  /**
   * Reset input.
   */
  readonly cleaner: HTMLInputElement;
  /**
   * Search engine logo.
   */
  readonly favicon: HTMLImageElement;
  /**
   * Updates the search form's logo based on the currently selected search engine.
   */
  render: () => void;
}

/**
 * The key used to store the search engine in the local storage.
 */
const engine_key = "search_engine";
/**
 * The default search engine.
 */
const def_engine = "google";
/**
 * a custom search form with ID `searcher`.
 */
const form = document.getElementById("searcher") as Searcher;

form.render = (): void => {
  form.favicon.src = favicon(cur_engine);
  form.query.setAttribute(
    "data-msargs",
    cur_engine.charAt(0).toUpperCase() + cur_engine.slice(1)
  );
};

form.cleaner.addEventListener("click", () => {
  form.query.value = "";
  form.query.dispatchEvent(new Event("input"));
  form.query.focus();
});

/**
 * A dictionary of supported search engines and their query URLs.
 */
const engines: dictionary<string> = {
  google: "https://www.google.com/search",
  bing: "https://www.bing.com/search",
  you: "https://you.com/search",
  openai: "https://chat.openai.com/",
  duckduckgo: "https://duckduckgo.com/",
  tiktok: "https://www.tiktok.com/search",
  facebook: "https://www.facebook.com/search/top",
};

let sor_engine = localStorage.getItem(engine_key);
/**
 * The engine that is used.
 */
let cur_engine: string =
  sor_engine && engines[sor_engine] ? sor_engine : def_engine;

/**
 * Initializes a search form and binds its behavior to the search functionality.
 *
 * @returns {void}
 */
export const init_searcher = (): void => {
  form.mode = "text";
  form.setAttribute("data-active-mode", "text");
  form.render();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = form.query.value.trim();
    if (!q) return;

    switch (form.mode) {
      case "url":
        visit(/^[A-z]+:\/\//.test(q) ? q : "https://" + q);
    }

    visit(engines[cur_engine] || engines[def_engine], { q });
  });

  form.query.addEventListener("input", () => {
    const mode = isURL(form.query.value.trim()) ? "url" : "text";
    if (form.mode !== mode) {
      form.mode = mode;
      form.setAttribute("data-active-mode", mode);
    }
  });

  form.query.addEventListener("focus", () =>
    form.setAttribute("data-focused", "true")
  );
  form.query.addEventListener("blur", () =>
    form.removeAttribute("data-focused")
  );
};

/**
 * Sets the search engine to be used for queries.
 *
 * @param {string} engine The key of the search engine to set.
 * @throws {Error} If the provided engine is not supported.
 * @returns {void}
 */
export const set_engine = (engine: string): void => {
  if (!engines[engine]) throw new Error(`Engine '${engine}' is not supported.`);

  localStorage.setItem(engine_key, engine);
  form.render();
};
