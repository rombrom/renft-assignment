import { DAY_NAMES, isSameDay } from "../../shared/utils.js";
import { h } from "../lib.js";

export function Dates({ days = [], today = new Date() }) {
  return h(
    "ol.dates",
    days.map((date) =>
      h(
        "li",
        h(
          `time.weekday${isSameDay(date, today) ? ".today" : ""}`,
          { dateTime: date.toISOString() },
          h("span.weekday__name", DAY_NAMES[date.getDay()]),
          h("span.weekday__date", date.getDate())
        )
      )
    )
  );
}
