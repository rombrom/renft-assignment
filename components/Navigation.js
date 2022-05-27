import { h } from "../lib.js";
import { offsetDays } from "../utils.js";

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
