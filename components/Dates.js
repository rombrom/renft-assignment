import { h } from "../lib.js";
import { DAY_NAMES, isSameDay } from "../utils.js";

export function Dates({ days = [], today = new Date() }) {
  return h(
    "ol.dates",
    { ariaHidden: true },
    days.map((date) =>
      h(
        "li",
        h(
          `time.weekday${isSameDay(date, today) ? ".today" : ""}`,
          h("span.weekday__name", DAY_NAMES[date.getDay()]),
          h("span.weekday__date", date.getDate())
        )
      )
    )
  );
}
