import { fetchEvents } from "../services/events.js";
import { getWeek } from "../shared/utils.js";
import {
  AllDayEvents,
  Dates,
  Days,
  ErrorMessage,
  Header,
} from "./components/index.js";
import { h } from "./lib.js";

export function Calendar({ date = new Date() }) {
  const today = new Date();
  const days = getWeek(date);

  const allDayEventsView = AllDayEvents({ days });
  const eventsView = Days({ loading: true });
  const update = async (fn) => eventsView.replaceWith(await fn());

  update(async () => {
    try {
      const { allDayEvents, events } = await fetchEvents(...days);

      allDayEventsView.replaceWith(
        AllDayEvents({ days, events: allDayEvents })
      );
      eventsView.replaceWith(Days({ days, events, loading: false }));
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
