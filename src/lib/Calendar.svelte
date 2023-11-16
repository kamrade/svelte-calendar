<script lang="ts">
  import { startOfMonth, endOfMonth } from 'date-fns';
  import { 
    weekdays,
    getPreviousMonth,
    getNextMonth,
    getPreviousYear,
    getNextYear,
    getPreviousDecade,
    getNextDecade,
    refreshCalendarGrid,
    dateIsInRange
  } from './Calendar';
  import type { IDays, DayType } from './Calendar';
  import MonthAndYear from './MonthAndYear.svelte';


  export let dateRange = false;
  export let datePrimary: Date | undefined;
  export let dateSecondary: Date | undefined = dateRange ? undefined : new Date();
  export let onChange: (datePrimary?: Date, dateSecondary?: Date) => void;


  const d = new Date();
  let actualMonth = d.getMonth();
  let actualYear = d.getFullYear();
  let actualDay = d.getDate();
  
  let currentMonth = actualMonth;
  let currentYear = actualYear;
  
  let currentMonthStartDay: Date;
  let currentMonthEndDay: Date;
  let daysInCurrentMonth: number;

  let previousMonth: number;
  let previousYear: number;
  let previousMonthStartDay: Date;
  let previousMonthEndDay: Date;
  let daysInPreviousMonth: number;

  let nextMonth: number;
  let nextYear: number;
  let nextMonthStartDay: Date;
  let nextMonthEndDay: Date;
  let daysInNextMonth: number;

  // Selected date, or date-range start:
  // let selectedDate: Date | undefined = datePrimary;
  let selectedDayPrimary: number | undefined = datePrimary && datePrimary.getDate();
  let selectedMonthPrimary: number | undefined = datePrimary && datePrimary.getMonth();
  let selectedYearPrimary: number | undefined = datePrimary && datePrimary.getFullYear();

  // Date-range:
  // let selectedDateSec: Date | undefined = dateRange ? dateEnd : undefined;
  let selectedDaySec: number | undefined = dateRange ? dateSecondary && dateSecondary.getDate() : undefined;
  let selectedMonthSec: number | undefined = dateRange ? dateSecondary && dateSecondary.getMonth() : undefined;
  let selectedYearSec: number | undefined = dateRange ? dateSecondary && dateSecondary.getFullYear() : undefined;

  type CurrentSelector = 'primary' | 'secondary';
  let currentSelector: CurrentSelector = 'primary';


  let currentMonthDays: IDays[][];
  

  $: {
    daysInCurrentMonth = new Date(currentYear, currentMonth+1, 0).getDate();
    currentMonthStartDay = startOfMonth(new Date(currentYear, currentMonth+1, 0));
    currentMonthEndDay = endOfMonth(new Date(currentYear, currentMonth+1, 0));
    
    [previousMonth, previousYear] = getPreviousMonth(currentMonth, currentYear);
    previousMonthStartDay = startOfMonth( new Date(previousYear, previousMonth+1, 0) );
    previousMonthEndDay = endOfMonth( new Date(previousYear, previousMonth+1, 0) );
    daysInPreviousMonth = new Date(previousYear, previousMonth+1, 0).getDate();

    [nextMonth, nextYear] = getNextMonth(currentMonth, currentYear);
    nextMonthStartDay = startOfMonth( new Date(nextYear, nextMonth+1, 0) );
    nextMonthEndDay = endOfMonth( new Date(nextYear, nextMonth+1, 0) );
    daysInNextMonth = new Date(nextYear, nextMonth+1, 0).getDate();

    currentMonthDays = refreshCalendarGrid(currentMonthStartDay, daysInPreviousMonth, daysInCurrentMonth);

    if (dateRange) {
      selectedDayPrimary = datePrimary?.getDate();
      selectedMonthPrimary = datePrimary?.getMonth();
      selectedYearPrimary = datePrimary?.getFullYear();
      selectedDaySec = dateSecondary?.getDate();
      selectedMonthSec = dateSecondary?.getMonth();
      selectedYearSec = dateSecondary?.getFullYear();
    } else {
      selectedDayPrimary = datePrimary?.getDate();
      selectedMonthPrimary = datePrimary?.getMonth();
      selectedYearPrimary = datePrimary?.getFullYear();
    }
  }

  // reset view to current month
  const reset = (e: MouseEvent) => {
    if (e.altKey) {
      currentMonth = actualMonth;
      currentYear = actualYear;
    }
  }

  // click previous
  const prev = (e: MouseEvent) => {
    if (e.shiftKey) {
      [currentMonth, currentYear] = getPreviousYear(currentMonth, currentYear);
    } else if (e.altKey) {
      [currentMonth, currentYear] = getPreviousDecade(currentMonth, currentYear);
    } else {
      [currentMonth, currentYear] = getPreviousMonth(currentMonth, currentYear);
    }
  };

  // click next
  const next = (e: MouseEvent) => {
    if (e.shiftKey) {
      [currentMonth, currentYear] = getNextYear(currentMonth, currentYear);
    } else if (e.altKey) {
      [currentMonth, currentYear] = getNextDecade(currentMonth, currentYear);
    } else {
      [currentMonth, currentYear] = getNextMonth(currentMonth, currentYear);
    }
  };

  // mouse click handler. Set date-range
  const setDate = (e: MouseEvent, day: number) => {
    if (dateRange) {
      if (currentSelector === 'primary') {
        let selectedDatePrimary = new Date(currentYear, currentMonth, day);
        onChange && onChange(selectedDatePrimary, dateSecondary);
        currentSelector = 'secondary';
      } else if (currentSelector === 'secondary') {
        let selectedDateSecondary = new Date(currentYear, currentMonth, day);
        onChange && onChange(datePrimary, selectedDateSecondary);
        currentSelector = 'primary';
      }
    } else {
      let selectedDate = new Date(currentYear, currentMonth, day);
      onChange && onChange(selectedDate);
    }
  }

  // Used for appearance of each date
  const checkDate = (day: number, dayType: DayType) => {
    if (dateRange) {
      let currentDate: Date;

      if (dayType === 'previousMonth') {
        if (previousMonth !== 11) {
          currentDate = new Date(currentYear, previousMonth, day);
        } else {
          currentDate = new Date(currentYear-1, previousMonth, day);
        }
      } else if (dayType === 'nextMonth') {
        if (nextMonth !== 0) {
          currentDate = new Date(currentYear, nextMonth, day);
        } else {
          currentDate = new Date(currentYear+1, nextMonth, day);
        }
        // if currentMonth:
      } else {
        currentDate = new Date(currentYear, currentMonth, day);
      }

      if (datePrimary && dateSecondary) {
        if (dateIsInRange(currentDate, datePrimary, dateSecondary)) {
          return true;
        }
      }
    }

    return false;
  }
 

</script>

<div class='calendar'>
  
  <MonthAndYear {currentMonth} {currentYear} {prev} {next} {reset} />

  <div class="month-view">
     <div class="week">
      {#each weekdays as weekday, index}
        <div class="weekday">
          {weekday.title}
        </div>
      {/each}
    </div>

    <div class='month-view'>
      {#each currentMonthDays as week, index}
        {#each week as day, index}
          <!-- TODO: Classname can be shortened with some generic function -->
          <div
            class={`
              day ${day.dayType} 
              ${(actualMonth === currentMonth
                && actualYear === currentYear
                && actualDay === day.dateNumber
                && day.dayType === 'currentMonth') ? 'today' : ''}
              
              ${(selectedMonthPrimary === currentMonth
                && selectedYearPrimary === currentYear
                && selectedDayPrimary === day.dateNumber
                && day.dayType === 'currentMonth') ? 'selected-day' : ''}

              ${(selectedMonthPrimary === nextMonth
                && selectedYearPrimary === nextYear
                && selectedDayPrimary === day.dateNumber
                && day.dayType === 'nextMonth') ? 'selected-day' : ''}

              ${(selectedMonthPrimary === previousMonth
                && selectedYearPrimary === previousYear
                && selectedDayPrimary === day.dateNumber
                && day.dayType === 'previousMonth') ? 'selected-day' : ''}
              
              ${(selectedMonthSec === currentMonth
                && selectedYearSec === currentYear
                && selectedDaySec === day.dateNumber
                && day.dayType === 'currentMonth') ? 'selected-day-sec' : ''}

              ${(selectedMonthSec === nextMonth
                && selectedYearSec === nextYear
                && selectedDaySec === day.dateNumber
                && day.dayType === 'nextMonth') ? 'selected-day-sec' : ''}

              ${(selectedMonthSec === previousMonth
                && selectedYearSec === previousYear
                && selectedDaySec === day.dateNumber
                && day.dayType === 'previousMonth') ? 'selected-day-sec' : ''}
              
              ${checkDate(day.dateNumber, day.dayType) ? 'in-range' : ''}
            `}
            on:mouseup={(e) => { day.dayType === 'currentMonth' && setDate(e, day.dateNumber) }}
          >
            {day.dateNumber}
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <div class="description">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00001 14.6667C4.31801 14.6667 1.33334 11.682 1.33334 8.00001C1.33334 4.31801 4.31801 1.33334 8.00001 1.33334C11.682 1.33334 14.6667 4.31801 14.6667 8.00001C14.6667 11.682 11.682 14.6667 8.00001 14.6667ZM8.00001 13.3333C9.4145 13.3333 10.7711 12.7714 11.7712 11.7712C12.7714 10.7711 13.3333 9.4145 13.3333 8.00001C13.3333 6.58552 12.7714 5.22897 11.7712 4.22877C10.7711 3.22858 9.4145 2.66668 8.00001 2.66668C6.58552 2.66668 5.22897 3.22858 4.22877 4.22877C3.22858 5.22897 2.66668 6.58552 2.66668 8.00001C2.66668 9.4145 3.22858 10.7711 4.22877 11.7712C5.22897 12.7714 6.58552 13.3333 8.00001 13.3333V13.3333ZM7.33334 4.66668H8.66668V6.00001H7.33334V4.66668ZM7.33334 7.33334H8.66668V11.3333H7.33334V7.33334Z" fill="#B1B1B1"/>
    </svg>

    Use Shift or Alt to change year or decade. Alt + click on month to reset to current
  </div>

</div>

<style lang='scss'>

  $color-bg-day-100: #F4F5F6;
  $color-bg-day-200: #DEE1E4;
  $color-bg-day-300: #C7CCD0;

  $color-text-secondary: #B1B1B1;
  $cell-size: 40px;

  $in-range-bg-100: #97C547;
  $in-range-bg-200: #8CB93F;

  .description {
    font-size: .75rem;
    color: $color-text-secondary;
    padding: .5rem;

    > svg {
      position: relative;
      top: 3px;
    }
  }

  .calendar {
    position: relative;
    border-radius: 12px;
    box-shadow: 0 0 24px rgba(0,0,0,0.1);
    padding: 1rem;
    width: $cell-size * 7 + 7 * 2 + 16 * 2;
    box-sizing: border-box;
  }

  .month-view {
    display: flex;
    flex-wrap: wrap;
  }

  .week {
    display: flex;
  }

  .weekday {
    width: $cell-size;
    height: $cell-size;
    line-height:$cell-size;
    font-size: .75rem;
    text-align: center;
    color: $color-text-secondary;
    border: 1px solid transparent;
  }

  .day {
    width: $cell-size;
    height: $cell-size;
    line-height: $cell-size;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    background: $color-bg-day-100;
    transition: all .1s ease-in-out;
    border: 1px solid transparent;

    &.currentMonth {
      &:hover {
        background: $color-bg-day-200;
      }
      &:active {
        background: $color-bg-day-300;
      }
    }

    &.today {
      border-color: green;
      color: green;
    }

    &.in-range {
      background-color: $in-range-bg-100;
      color: white;
      &:hover {
        background-color: $in-range-bg-200;
      }
    }

    &.selected-day-sec {
      background-color: green;
      color: white;
       &:hover {
        background: green;
      }
    }

    &.selected-day {
      background-color: green;
      color: white;
       &:hover {
        background: green;
      }
    }

    &.previousMonth, &.nextMonth {
      opacity: .3;
      cursor: default;
    }
    
  }

</style>
