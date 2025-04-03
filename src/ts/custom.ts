import { init_shortcuts } from "./utils/shortcuts.js";
import { init_searcher } from "./utils/search.js";
import use_translation from "./lib/translation/index.js";

/**
 * Initializes the application by setting up 
 * search functionality, shortcuts, and translations.
 */
const init = (): void => {
  init_searcher(); // Initialize the search system
  init_shortcuts(); // Initialize keyboard shortcuts
  use_translation(); // Set up translation support
};

// Ensure the DOM is fully loaded before initializing
window.addEventListener("DOMContentLoaded", init);
