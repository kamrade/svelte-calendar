import { format, isBefore, isAfter, isEqual } from 'date-fns';


export const weekdays = [{
  title: 'Su'
}, {
  title: 'Mo'
}, {
  title: 'Tu'
}, {
  title: 'We'
}, {
  title: 'Th'
}, {
  title: 'Fr'
}, {
  title: 'Sa'
}];


export const weekdaysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


export const getPreviousMonth = (currentMonth: number, currentYear: number): number[] => {
  if (currentMonth === 0) {
    return [ 11, currentYear - 1 ];
  } else {
    return [ currentMonth - 1, currentYear ];
  }
}


export const getNextMonth = (currentMonth: number, currentYear: number) => {
  if (currentMonth === 11) {
    return [ 0, currentYear + 1 ];
  } else {
    return [ currentMonth + 1, currentYear ];
  }
}


export const getPreviousYear = (currentMonth: number, currentYear: number) => [ currentMonth, currentYear-1];


export const getNextYear = (currentMonth: number, currentYear: number) => [ currentMonth, currentYear+1];


export const getPreviousDecade = (currentMonth: number, currentYear: number) =>  [ currentMonth, currentYear-10];


export const getNextDecade = (currentMonth: number, currentYear: number) => [ currentMonth, currentYear+10];


export const getWeekdayName = (day: Date): string => format(day, 'EEE');


export const getWeekday = (day: Date): number => weekdaysArray.indexOf( getWeekdayName(day) );


export type DayType = 'currentMonth' | 'previousMonth' | 'nextMonth';


export interface IDays {
  dayType: DayType;
  dateNumber: number;
}


export const refreshCalendarGrid = (currentMonthStartDay: Date, daysInPreviousMonth: number, daysInCurrentMonth: number) => {

  const currentMonthStartDayNumber = getWeekday(currentMonthStartDay);
  const weeks = Math.trunc((daysInCurrentMonth - (7 - currentMonthStartDayNumber)) / 7);
  let max = 0;
  let nextMax = 1;
  const currentMonthDays: IDays[][] = [[],[],[],[],[],[]];

  for (let i = 0; i < 6; i++) {
    if (i === 0) {
      for (let j = 0; j < currentMonthStartDayNumber; j++) {
        currentMonthDays[i][j] = {
          dayType: 'previousMonth',
          dateNumber: daysInPreviousMonth - currentMonthStartDayNumber + j + 1
        };
      }
      for (let j = currentMonthStartDayNumber; j < 7; j++) {
        max++;
        currentMonthDays[i][j] = {
          dayType: 'currentMonth',
          dateNumber: j - currentMonthStartDayNumber + 1
        };
      }
    } else if (i > weeks) {
      
      for (let j = 0; j < 7; j++) {
        if (max < daysInCurrentMonth) {
          max++;
          currentMonthDays[i][j] = {
            dayType: 'currentMonth',
            dateNumber: max
          };
        } else {
          currentMonthDays[i][j] = {
            dayType: 'nextMonth',
            dateNumber: nextMax
          };
          nextMax++;
        } 
      }

    } else {
      for (let j = 0; j < 7; j++) {  
        max++;        
        currentMonthDays[i][j] = {
          dayType: 'currentMonth',
          dateNumber: max
        };
      }
    }
  }

  return currentMonthDays;
}

export const dateIsInRange = (date: Date, date1: Date, date2: Date) => {
  if (isEqual(date1, date2)) {
    return false;
  }
  
  if (isBefore(date1, date2)) {
    if (isBefore(date, date2) && isAfter(date, date1)) {
      return true;
    }
  }

  if (isBefore(date2, date1)) {
    if (isBefore(date, date1) && isAfter(date, date2)) {
      return true;
    }
  }

  return false;
}

export interface ICalendarOptions {
  textColorBase?: string;
  textColorSecondary?: string;
  textColorMuted?: string;
  textColorBaseInverted?: string;
  textColorSecondaryInverted?: string;
  textColorPrimaryInverted?: string;

  lineColorPrimary?: string;

  surfaceColorBase?: string;
  surfaceColorDateActive?: string;
  surfaceColorDateFrame?: string;
  surfaceColorDateSelection100?: string;
  surfaceColorDateSelection200?: string;

  spacingNull?: number;
  spacingBase?: number;
  spacingCalendarPadding?: number;
  spacingDateSize?: number;

  radiusNull?: number;
  radiusDay?: number;
  radiusPanel?: number;

}

export const calendarOptions: ICalendarOptions = {
  textColorBase: "#272727",
  textColorSecondary: "#818181",
  textColorMuted: "#b4b4b4",
  textColorBaseInverted: "#ffffff",
  textColorSecondaryInverted: "rgba(255, 255, 255, 0.6)",
  textColorPrimaryInverted: "#faff00",

  lineColorPrimary: "#1b993e",

  surfaceColorBase: "#ffffff",
  surfaceColorDateActive: "#f5f8fa",
  surfaceColorDateFrame: "#0e9233",
  surfaceColorDateSelection100: "#25b74e",
  surfaceColorDateSelection200: "#21b348",

  spacingNull: 0,
  spacingBase: 8,
  spacingCalendarPadding: 24,
  spacingDateSize: 24,

  radiusNull: 0,
  radiusDay: 0,
  radiusPanel: 12,
};