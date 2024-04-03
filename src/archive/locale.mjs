const supportedLocaleCodes = ["en-NL", "nl-NL", "en-US"];

const locale = Object.freeze({
  /**
   * time format using supported locale codes
   */
  timeFormat: new Intl.DateTimeFormat(supportedLocaleCodes, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: false,
  }),
  /** date format using supported locale codes
   */
  dateFormat: new Intl.DateTimeFormat(supportedLocaleCodes, {
    month: "long",
    day: "2-digit",
    year: "numeric",
    weekday: "long",
  }),
});

export {locale};
