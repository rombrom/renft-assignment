import { offsetDays } from "../../shared/utils.js";
import { h } from "../lib.js";

export function Navigation({ date }) {
  const prevUrl = `/?date=${encodeURIComponent(
    offsetDays(date, -7).toDateString()
  )}`;
  const nextUrl = `/?date=${encodeURIComponent(
    offsetDays(date, 7).toDateString()
  )}`;

  return h(
    "nav.nav",
    h("a.nav__button", "‹", { ariaLabel: "Previous week", href: prevUrl }),
    h("a.nav__today", "Today", { href: "/" }),
    h("a.nav__button", "›", { ariaLabel: "Next week", href: nextUrl })
  );
}
