import {
  AllDayEvents,
  Dates,
  ErrorMessage,
  Events,
  Header,
} from "./components/index.js";
import { fetchEvents } from "./data.js";
import { h } from "./lib.js";
import { getWeekDays } from "./utils.js";

export function Calendar({ date = new Date(), event }) {
  const today = new Date();
  const days = getWeekDays(date);

  const allDayEventsView = AllDayEvents({ days });
  const eventsView = Events({ loading: true });
  const update = async (fn) => eventsView.replaceWith(await fn());

  update(async () => {
    try {
      const { allDayEvents, events } = await fetchEvents(...days);

      console.log({ allDayEvents, events });

      allDayEventsView.replaceWith(
        AllDayEvents({ days, events: allDayEvents })
      );
      eventsView.replaceWith(Events({ days, events, loading: false }));
    } catch (error) {
      console.error(error);
      eventsView.replaceWith(ErrorMessage({ error }));
    }
  });

  return h(
    "main.calendar",
    { id: "calendar" },
    h(
      "div.calendar__header",
      Header({ date }),
      Dates({ days, today }),
      allDayEventsView
    ),
    eventsView
  );
}
