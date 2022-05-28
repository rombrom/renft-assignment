import { h } from "../lib.js";
import { DAY_LENGTH, offsetDays } from "../utils.js";
import { Event } from "./Event.js";

export function Events({ days = [], events = new Map(), loading = false }) {
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
    ...days.map((dayStart) => {
      const dayEnd = offsetDays(dayStart, 1);
      const dayEvents = events.get(dayStart) ?? [];

      return h(
        "article.day",
        h("h2.day__title.sr-only", dayStart.toString()),
        h(
          "ol.day__events",
          ...dayEvents.map((event, i) => {
            const hasOverlap = dayEvents
              .filter((e) => e !== event)
              .some(
                (e) => e.dateFrom < event.dateTo && e.dateTo > event.dateFrom
              );

            const offsetEvent = dayEvents
              .slice(0, i)
              .reverse()
              .find((e) => e.dateTo <= event.dateFrom);

            const offsetDate = Math.max(
              Number(dayStart),
              offsetEvent ? Number(offsetEvent.dateTo) : 0
            );

            const minDate = Math.max(Number(dayStart), Number(event.dateFrom));
            const maxDate = Math.min(Number(dayEnd), Number(event.dateTo));

            const offsetY = (minDate - offsetDate) / DAY_LENGTH;
            const height = (maxDate - minDate) / DAY_LENGTH;

            return h(
              "li",
              {
                style: {
                  flexBasis: !hasOverlap ? "100%" : "0",
                  height: `${height * 100}%`,
                  top: `${offsetY * 100}%`,
                },
              },
              Event(event)
            );
          })
        )
      );
    })
  );
}
