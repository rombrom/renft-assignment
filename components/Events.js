import { h } from "../lib.js";

export function Events({ days = [], data }) {
  console.log("Events", data);
  return h(
    "section.days",
    h(
      "ol.times",
      { ariaHidden: true },
      Array(24)
        .fill()
        .map((_, i) => h("li.label", `${i.toString().padStart(2, "0")}:00`))
    ),
    ...days.map((date) => h("article.day", "events"))
  );
}
