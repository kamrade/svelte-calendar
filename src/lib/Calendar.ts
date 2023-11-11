import { format } from 'date-fns';

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

export const monthes = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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

export const getWeekdayName = (day: Date): string => {
  return format(day, 'EEE');
}

export const getWeekday = (day: Date): number => {
  return weekdaysArray.indexOf( getWeekdayName(day) );
}