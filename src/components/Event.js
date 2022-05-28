import { h } from "../lib.js";

export function Event({ id, eventName }) {
  return h("article.event", { id }, eventName);
}
