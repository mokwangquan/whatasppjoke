export function parseDate(unparsedDate) {
  const options = {
    timeZone: undefined,
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
  };
  const parsedDate = new Date(unparsedDate).toLocaleTimeString(
    "en-US",
    options
  );
  return parsedDate;
}

export function trimText(untrimmed) {
  if (untrimmed) {
    if (untrimmed.length > 40) {
      let trimmed = untrimmed.trim().substr(0, 37).concat('...')
      return trimmed
    }
    return untrimmed
  }
  return null
}
