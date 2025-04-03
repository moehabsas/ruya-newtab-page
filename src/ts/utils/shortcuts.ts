import { favicon } from "./urls.js";

const container = document.getElementById("shortcuts") as HTMLDivElement;

/**
 * A list of predefined shortcuts with their, links, and titles.
 */
const list = [
  { href: "https://chat.deepseek.com", title: "DeepSeek" },
  { href: "https://www.tiktok.com", title: "TikTok" },
  { href: "https://www.youtube.com", title: "YouTube" },
  { href: "https://www.facebook.com", title: "Facebook" },
  { href: "https://mp3quran.net", title: "Quran" },
  { href: "https://www.instagram.com", title: "Instagram" },
  { href: "https://chat.openai.com", title: "ChatGPT" }
];

/**
 * Dynamically renders shortcuts into a specified container.
 *
 * @returns {void}
 */
export const init_shortcuts = (): void => {
  container.innerHTML = list.map(({ href, title }) => `
    <a href="${href}" target="_top" title="${title}" draggable="true">
      <div>
        <img src="${favicon(title.toLocaleLowerCase())}" alt="${title} logo" />
      </div>
      <p>${title}</p>
    </a>
  `).join("");
};
