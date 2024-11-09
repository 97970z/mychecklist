// dateUtils.js

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getKSTDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 9); // KST = UTC+9
  return date;
};

export const compareKSTDates = (date1, date2) => {
  const d1 = getKSTDate(date1);
  const d2 = getKSTDate(date2);
  return d1.getTime() - d2.getTime();
};

export const isBeforeToday = (dateString) => {
  const today = getKSTDate(getTodayDate());
  const date = getKSTDate(dateString);
  return date.getTime() < today.getTime();
};
