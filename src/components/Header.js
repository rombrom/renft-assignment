import { MONTH_NAMES } from "../../shared/utils.js";
import { h } from "../lib.js";
import { Navigation } from "./navigation.js";

export function Header({ date }) {
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return h(
    "header.header",
    h(
      "h1.title",
      h("time", h("span.title__month", month), h("span.title__year", year))
    ),
    Navigation({ date })
  );
}
