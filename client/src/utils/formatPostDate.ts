import { getMonthNameFromNumber } from "./getMonthNameFromNumber";

export const formatPostDate = (unformattedDate: string = "") => {
  if (unformattedDate === "just now") return "just now";
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  let dateWithoutCharacters = unformattedDate.replace("T", " ");
  dateWithoutCharacters = dateWithoutCharacters.replace("Z", " ");
  const [date, hour] = dateWithoutCharacters.split(" ");
  const postYear = Number(date.split("-")[0]);
  const postMonth = Number(date.split("-")[1]);
  const postDay = Number(date.split("-")[2]);

  const postHour = Number(hour.split(":")[0]) + 2;
  const postMinute = Number(hour.split(":")[1]);

  if (currentYear === postYear) {
    if (currentMonth === postMonth) {
      if (currentDay === postDay) {
        if (currentHour === postHour) {
          const timeAgo = currentMinutes - postMinute;
          if (timeAgo === 0) return `just now`;
          return `${timeAgo} ${timeAgo > 1 ? "minutes" : "minute"} ago`;
        } else {
          const timeAgo = currentHour - postHour;
          return `${timeAgo} ${timeAgo > 1 ? "hours" : "hour"} ago`;
        }
      } else {
        const timeAgo = currentDay - postDay;
        return `${timeAgo} ${timeAgo > 1 ? "days" : "day"} ago`;
      }
    }
  }

  return `${getMonthNameFromNumber(postMonth)} ${postDay} ${postYear}, ${
    postHour > 9 ? "" : "0"
  }${postHour}:${postMinute > 9 ? "" : "0"}${postMinute}`;
};
