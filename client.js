function h(el = new DocumentFragment(), { children, style, ...props } = {}) {
  const doc = typeof el === "string" ? document.createElement(el) : el;

  if (Array.isArray(children)) for (const node of children) mount(doc, node);
  else if (children !== null && children !== undefined) mount(doc, children);

  for (const prop in props.style) el.style[prop] = props.style[prop];

  for (const prop in props) {
    if (prop.startsWith("on"))
      doc[prop.toLowerCase()] = (event) => {
        props[prop](event);
      };
    else doc[prop] = props[prop];
  }

  return doc;
}

function mount(target = document.body, node) {
  target =
    typeof target === "string" ? document.getElementById(target) : target;
  target.append(typeof node === "function" ? node() : node);
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function offsetDays(date, days = 0) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

function getWeekDays(date) {
  const day = date.getDay();
  const weekStart = offsetDays(date, -(day - 1));
  const days = [];

  for (let i = 0; i < 7; i++) days.push(offsetDays(weekStart, i));

  return days;
}

function Navigation({ date, ...props }) {
  const prevUrl = `/?date=${offsetDays(date, -7).toISOString()}`;
  const nextUrl = `/?date=${offsetDays(date, 7).toISOString()}`;

  return h("nav", {
    ...props,
    children: [
      h("a", { children: "Prev", href: prevUrl }),
      h("a", { children: "Today", href: "/" }),
      h("a", { children: "Next", href: nextUrl }),
    ],
  });
}

function Title(props) {
  return h("h1", props);
}

function Header({ date }) {
  return h("header", {
    children: [
      Title({
        children: `${months[date.getMonth()]} ${date.getFullYear()}`,
        className: "header__title",
      }),
      Navigation({ className: "header__navigation", date }),
    ],
    className: "header",
  });
}

function WeekdayTitle({ date }) {
  return h("th", {
    children: `${days[date.getDay()]} ${date.getDate()}`,
    className: "day__title",
  });
}

function Calendar({ date = new Date(), event }) {
  const today = new Date();
  const weekdays = getWeekDays(date);

  return h("main", {
    children: [
      Header({ date }),
      h("table", {
        children: [
          h("col"),
          h("col"),

          h("tr", {
            children: [
              h("th"),
              ...weekdays.map((date) => WeekdayTitle({ date })),
            ],
            className: "week__row min-content",
          }),

          h("tr", {
            children: [
              h("th", {
                children: "all-day",
                className: "day__all-day-events label",
              }),
              ...weekdays.map((date) =>
                h("td", {
                  children: "Alldays",
                  className: "day__all-day-events",
                })
              ),
            ],
            className: "week__row min-content",
          }),

          h("tr", {
            children: [
              h("th", {
                children: [
                  h("span", { children: "Events", className: "sr-only" }),
                  h("ol", {
                    ariaHidden: true,
                    children: Array(24)
                      .fill()
                      .map((_, i) =>
                        h("li", {
                          children: `${i.toString().padStart(2, "0")}:00`,
                          className: "label",
                        })
                      ),
                    className: "times",
                  }),
                ],
              }),

              ...weekdays.map((date) =>
                h("td", {
                  children: h("ol", {
                    children: [h("li", { children: "Events" })],
                    className: "events",
                  }),
                  className: "day__events",
                })
              ),
            ],
            className: "week__row week__events",
          }),
        ],
        className: "week",
      }),
    ],
    className: "calendar",
    id: "calendar",
  });
}

function main() {
  const params = new URLSearchParams(window.location.search);

  const date = params.has("date") ? new Date(params.get("date")) : new Date();
  const event = params.has("event") ? new Date(params.get("event")) : undefined;

  mount(document.getElementById("root"), Calendar({ date, event }));
}

main();
