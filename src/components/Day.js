import { DAY_LENGTH, offsetDays } from "../../shared/utils.js";
import { h } from "../lib.js";
import { Event } from "./Event.js";

export function Day({ dayStart, events = [] }) {
  const dayEnd = offsetDays(dayStart, 1);

  return h(
    "article.day",
    h("h2.day__title.sr-only", dayStart.toString()),
    h(
      "ol.day__events",
      events.map((event, i) => {
        const hasOverlap = events
          .filter((e) => e !== event)
          .some((e) => e.dateFrom < event.dateTo && e.dateTo > event.dateFrom);

        const offsetEventDate =
          events
            .slice(0, i)
            .reverse()
            .find((e) => e.dateTo <= event.dateFrom)?.dateTo ?? new Date(0);

        const offsetDate = Math.max(Number(dayStart), Number(offsetEventDate));
        const minDate = Math.max(Number(dayStart), Number(event.dateFrom));
        const maxDate = Math.min(Number(dayEnd), Number(event.dateTo));

        const offsetY = (minDate - offsetDate) / DAY_LENGTH;
        const height = (maxDate - minDate) / DAY_LENGTH;

        const style = {
          flexBasis: !hasOverlap ? "100%" : "0",
          height: `${height * 100}%`,
          top: `${offsetY * 100}%`,
        };

        return h("li", { style }, Event(event));
      })
    )
  );
}
