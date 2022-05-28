import { h } from "../lib.js";
import { Day } from "./Day.js";

export function Days({ days = [], events = new Map(), loading = false }) {
  if (loading) return h("p", "Loading...");

  return h(
    "section.days",
    h(
      "ol.times",
      { ariaHidden: true },
      Array(24)
        .fill(null)
        .map((_, i) => h("li.label", `${i.toString().padStart(2, "0")}:00`))
    ),
    days.map((dayStart) => Day({ dayStart, events: events.get(dayStart) }))
  );
}
