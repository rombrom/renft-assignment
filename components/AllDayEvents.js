import { h } from "../lib.js";

export function AllDayEvents({ days = [] }) {
  return h(
    "ol.all-day-events",
    { ariaHidden: true },
    h("li.label", "all-day"),
    ...days.map((date) => h("li", "all day events"))
  );
}
