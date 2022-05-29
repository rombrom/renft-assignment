import { h } from "../lib.js";
import { Event } from "./Event.js";

export function AllDayEvents({ days = [], events = new Map() }) {
  return h(
    "ol.columns.all-day-events",
    h("li.label", { ariaHidden: true }, "all-day"),
    days.map((dayStart) => {
      const dayEvents = events.get(dayStart) ?? [];
      return h(
        "li",
        h(
          "h2.sr-only",
          `All-day events for`,
          h("time", { dateTime: dayStart.toISOString() }, dayStart.toString())
        ),
        h(
          "ol",
          dayEvents.map((event) => h("li", Event(event)))
        )
      );
    })
  );
}
