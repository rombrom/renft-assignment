import { Calendar } from "./src/Calendar.js";
import { mount } from "./src/lib.js";

const params = new URLSearchParams(window.location.search);

const date = params.has("date")
  ? new Date(decodeURIComponent(params.get("date")))
  : new Date();
const event = params.has("event") ? new Date(params.get("event")) : undefined;

document.title = date.toDateString();

mount(document.getElementById("root"), Calendar({ date, event }));
