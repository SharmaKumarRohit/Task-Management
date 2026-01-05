export function formateDateFull(dateFormate) {
  let date = new Date(dateFormate);
  const formattedDate = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate.slice(0, -2) + formattedDate.slice(-2).toUpperCase();
}

export function formateDateShort(dateFormate) {
  let date = new Date(dateFormate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
  });
}
