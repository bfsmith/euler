import * as R from 'ramda';

import { flatten } from '../../util';

interface ICalendarCache {
  [key: string]: ICalendar;
}

interface Month {
  (year: number): number;
}

interface ICalendar {
  year: number;
  month: number;
  days: string[];
}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months: Month[] = [
  /* January */ (year: number) => 31,
  /* February */ (year: number) => year % 4 != 0 ? 28 : 29,
  /* March */ (year: number) => 31,
  /* April */ (year: number) => 30,
  /* May */ (year: number) => 31,
  /* June */ (year: number) => 30,
  /* July */ (year: number) => 31,
  /* August */ (year: number) => 31,
  /* September */ (year: number) => 30,
  /* October */ (year: number) => 31,
  /* November */ (year: number) => 30,
  /* December */ (year: number) => 31,
];
const daysInMonth = (year: number, month: number) => months[month](year);

const mod = (n: number, m: number): number => n >= 0 ? n % m : (m + n) % m;

const getCalendar = R.memoize((year: number, month: number): ICalendar => {
  if (year === 1900 && month === 0) {
    return {
      year: year,
      month: month,
      days: R.range(0, daysInMonth(1900, 0))
        .map(v => days[(v + 1) % 7]) // + 1 since Jan 1 1900 is a Monday.
    };
  }
  const previousCalendar = getCalendar(month > 0 ? year : year - 1, mod(month - 1, 12));
  const lastDayOfPreviousCalendar = previousCalendar.days[previousCalendar.days.length - 1];
  const startDay = (days.indexOf(lastDayOfPreviousCalendar) + 1) % 7;
  const cal = {
    year: year,
    month: month,
    days: R.range(0, daysInMonth(year, month))
      .map(v => days[(v + startDay) % 7]),
  };
  return cal;
});

export const p19 = () => {
  // Flatten month calendars
  const calendars: ICalendar[] = flatten(
    // Calc calendars from Jan 1 1901 to Dec 31 2000
    R.range(1901, 2001).map(year =>
      R.range(0, 12).map(month => getCalendar(year, month))
    )
  );
  // Filter to which months have Sunday as the first day and print the length of that array
  console.log(calendars.filter(c => c.days[0] === days[0]).length);
};
