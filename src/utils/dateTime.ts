import {
  addDays,
  addMinutes,
  endOfISOWeek,
  format,
  parse,
  startOfISOWeek,
} from "date-fns";
import { ru } from "date-fns/locale";

export const parseFromTime = (time: string) => {
  const date = parse(time, "HH:mm", new Date());
  return date;
};

export const getCurrentDate = () => {
  const date = new Date();
  const current = format(date, "d MMMM", {
    locale: ru,
  });

  return current.toUpperCase();
};

export const splitTimeByInterval = (
  start: string,
  end: string,
  interval: number
) => {
  const startTime = parseFromTime(start);
  const endTime = parseFromTime(end);

  const result = [];
  let currentTime = startTime;
  while (currentTime <= endTime) {
    result.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }
  return result;
};

export const generateWeek = (date: string) => {
  const parserDate = parse(date, "dd.MM.yyyy", new Date());
  const startDate = startOfISOWeek(parserDate);
  const endDate = endOfISOWeek(parserDate);

  const result = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    result.push(format(currentDate, "dd.MM.yyyy"));
    currentDate = addDays(currentDate, 1);
  }

  return [result];
};
