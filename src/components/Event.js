import { h } from "../lib.js";

export function Event({ id, eventName, dateFrom, dateTo }) {
  return h(
    "article.event",
    { id },
    h("h3.event__title", eventName),
    h(
      "p.event__time"
      // h("time", { dateTime: dateFrom.toISOString() }, dateFrom.toTimeString()),
      // " – ",
      // h("time", { dateTime: dateTo.toISOString() }, dateTo.toTimeString())
    )
  );
}
