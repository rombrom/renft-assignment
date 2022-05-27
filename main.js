import { Calendar } from "./Calendar.js";
import { mount } from "./lib.js";

const params = new URLSearchParams(window.location.search);

const date = params.has("date") ? new Date(params.get("date")) : new Date();
const event = params.has("event") ? new Date(params.get("event")) : undefined;

document.title = date.toString();

mount(document.getElementById("root"), Calendar({ date, event }));
