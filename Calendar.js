import {
  AllDayEvents,
  Dates,
  ErrorMessage,
  Events,
  Header,
} from "./components/index.js";
import { h } from "./lib.js";
import { getWeekDays } from "./utils.js";

const fetchEvents = () =>
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0.5
          ? resolve("foo")
          : reject(new Error("Could not fetch your events :(")),
      100
    );
  });

export function Calendar({ date = new Date(), event }) {
  const today = new Date();
  const days = getWeekDays(date);

  const events = Events({ days });
  const update = async (fn) => events.replaceWith(await fn());

  update(async () => {
    try {
      const data = await fetchEvents();
      return Events({ data, days });
    } catch (error) {
      console.error(error);
      return ErrorMessage({ error });
    }
  });

  return h(
    "main.calendar",
    { id: "calendar" },
    h(
      "div.calendar__header",
      Header({ date }),
      Dates({ days, today }),
      AllDayEvents({ days })
    ),
    events
  );
}
