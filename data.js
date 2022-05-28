import { offsetDays } from "./utils.js";

export const fetchEvents = async (...days) => {
  const res = await fetch("./data.json");
  if (!res.ok) throw Error(`${res.status}: ${res.statusText}`);
  const data = await res.json();

  const allDayEvents = new Map(days.map((day) => [day, []]));
  const events = new Map(days.map((day) => [day, []]));

  for (const { dateFrom, dateTo, ...eventData } of data) {
    const event = {
      ...eventData,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
    };

    for (const dayStart of days) {
      const dayEnd = offsetDays(dayStart, 1);
      const allDayEventsCache = allDayEvents.get(dayStart);
      const eventsCache = events.get(dayStart);

      if (
        event.dateFrom < dayEnd &&
        event.dateTo >= dayStart &&
        event.dateFrom <= dayStart &&
        event.dateTo > dayEnd
      )
        allDayEventsCache?.push(event);
      else if (event.dateFrom < dayEnd && event.dateTo >= dayStart)
        eventsCache?.push(event);
    }
  }

  return { allDayEvents, events };
};
