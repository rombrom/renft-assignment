import { offsetDays } from "../../shared/utils.js";
import { h } from "../lib.js";

export function Navigation({ date }) {
  const prevUrl = `/?date=${offsetDays(date, -7).toISOString()}`;
  const nextUrl = `/?date=${offsetDays(date, 7).toISOString()}`;

  return h(
    "nav.navigation",
    h("a", "Prev", { href: prevUrl }),
    h("a", "Today", { href: "/" }),
    h("a", "Next", { href: nextUrl })
  );
}
