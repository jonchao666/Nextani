import { format, isToday, isYesterday, isThisYear } from "date-fns";

const formatDateKey = (date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (isThisYear(date)) {
    return format(date, "MMM d"); //  'Jan 26'
  } else {
    return format(date, "MMM d,yyyy"); //  'Jan 26,2023'
  }
};

export function groupHistoryByDate(history) {
  if (!history || !history.length) {
    // Check if history is null or empty
    return {}; // Return an empty object or appropriate default value
  }

  return history.reduce((grouped, item) => {
    const date = new Date(item.visitedOn);

    const dateKey = formatDateKey(date); // Format the date
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(item);
    return grouped;
  }, {});
}
