export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "";

  const absAmount = Math.abs(amount);

  if (absAmount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }

  if (absAmount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (absAmount >= 1_000) {
    return (amount / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return amount.toString();
}

export function formatReadableDate(dateString) {
  if (!dateString) return "";

  // Convert to proper ISO format (replace / with -)
  const formatted = dateString.replace(/\//g, "-");
  const date = new Date(formatted);

  if (isNaN(date)) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatMinutes(minutes) {
  if (!minutes && minutes !== 0) return "";

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;

  return `${hrs}h ${mins}m`;
}
