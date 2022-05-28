import { h } from "../lib.js";

export function ErrorMessage({ error = new Error() }) {
  return h(
    "article.error",
    h("h2.error__title", error.name),
    h("p", error.message)
  );
}
