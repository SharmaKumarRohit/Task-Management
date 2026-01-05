export function getPriorityColors(priority) {
  switch (priority) {
    case "high":
      return "bg-red-100 border-red-200 text-red-700";
    case "medium":
      return "bg-orange-100 border-orange-200 text-orange-700";
    case "low":
      return "bg-green-100 border-green-200 text-green-700";
    default:
      return "bg-neutral-100 border-neutral-200 text-neutral-700";
  }
}

export function getBorderColors(priority) {
  switch (priority) {
    case "high":
      return "border-l-red-500";
    case "medium":
      return "border-l-orange-500";
    case "low":
      return "border-l-green-500";
    default:
      return "border-l-neutral-500";
  }
}
