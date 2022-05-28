import { MONTH_NAMES } from "../../shared/utils.js";
import { h } from "../lib.js";
import { Navigation } from "./navigation.js";

function Title(...args) {
  return h("h1.title", ...args);
}

export function Header({ date }) {
  return h(
    "header.header",
    Title(`${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`),
    Navigation({ date })
  );
}
