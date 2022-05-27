export function h(el = "div", ...args) {
  const [name, ...classNames] = el.split(".");
  const doc = document.createElement(name);
  doc.className = classNames.join(" ");

  for (const arg of args) {
    if (Array.isArray(arg)) for (const node of arg) mount(doc, node);
    else if (
      arg instanceof Node ||
      ["bigint", "boolean", "number", "string"].includes(typeof arg)
    )
      mount(doc, arg);
    else {
      const { style, ...props } = arg;
      for (const prop in style) el.style[prop] = props.style[prop];

      for (const prop in props) {
        if (prop.startsWith("on"))
          doc[prop.toLowerCase()] = (event) => {
            props[prop](event);
          };
        else doc[prop] = props[prop];
      }
    }
  }

  return doc;
}

export function mount(target = document.body, node) {
  target =
    typeof target === "string" ? document.getElementById(target) : target;
  target.append(typeof node === "function" ? node() : node);
}
