<script lang="ts">
  import { startOfMonth, endOfMonth } from 'date-fns';
  import {
    getPreviousMonth,
    getNextMonth,
    getPreviousYear,
    getNextYear,
    getPreviousDecade,
    getNextDecade,
    refreshCalendarGrid,
    dateIsInRange,
    getStylingOptions,
    months,
    getWeekDays
  } from './Calendar';
  import type { ICalendarOptions } from './CalendarStylingOptions';
  import type { IDays, DayType, WeekStartsFrom } from './Calendar';


  export let name: string;
  export let dateRange = false;
  export let datePrimary: Date | undefined;
  export let dateSecondary: Date | undefined = dateRange ? undefined : new Date();
  export let onChange: (datePrimary?: Date, dateSecondary?: Date) => void;
  export let styles: ICalendarOptions = {};
  export let weekStartsFrom: WeekStartsFrom = 'Sunday';
  export let dateLimitation: (Date | null)[] = [null, null];
  export let showDescription: boolean = true;

  const validateLimitation = () => {

    let from = dateLimitFrom?.getTime();
    let to = dateLimitTo?.getTime();
    let primary = datePrimary?.getTime() || 0;
    let secondary = dateSecondary?.getTime() || 0;

    if (from && to) {
      if (primary && secondary) {
        return ((primary >= from) && (primary <= to)) && ((secondary >= from) && (secondary <= to));
      } else if (primary) {
        return (primary >= from) && (primary <= to);
      } else if (secondary) {
        return (secondary >= from) && (secondary <= to);
      }
    } else if (from) {
      if (primary && secondary) {
        return ((primary >= from)) && ((secondary >= from));
      } else if (primary) {
        return (primary >= from);
      } else if (secondary) {
        return (secondary >= from);
      }
    } else if (to) {
      if (primary && secondary) {
        return (primary <= to) && (secondary <= to);
      } else if (primary) {
        return primary <= to;
      } else if (secondary) {
        return secondary <= to;
      }
    }
    return true;
  }

  let dateLimitFrom = dateLimitation[0];
  let dateLimitFromYear = dateLimitFrom?.getFullYear() || 0;
  let dateLimitFromMonth = dateLimitFrom?.getMonth() || 0;
  let dateLimitFromDate = dateLimitFrom?.getDate() || 0;

  let dateLimitTo = dateLimitation[1];
  let dateLimitToYear = dateLimitTo?.getFullYear() || 0;
  let dateLimitToMonth = dateLimitTo?.getMonth() || 0;
  let dateLimitToDate = dateLimitTo?.getDate() || 0;

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
  let selectedDayPrimary: number | undefined = datePrimary && datePrimary.getDate();
  let selectedMonthPrimary: number | undefined = datePrimary && datePrimary.getMonth();
  let selectedYearPrimary: number | undefined = datePrimary && datePrimary.getFullYear();

  // Date-range:
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

    currentMonthDays = refreshCalendarGrid(currentMonthStartDay, daysInPreviousMonth, daysInCurrentMonth, weekStartsFrom);

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

    if (!validateLimitation()) {
      datePrimary = undefined;
      dateSecondary = undefined;
      console.error('Invalid dateRange value. Exceed the specified limit.' + name);
      console.error('Unset date');
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

  const checkDateLimitation = (dateNumber: number) => {

    if (dateLimitFrom || dateLimitTo) {
      let from = dateLimitFrom?.getTime();
      let to = dateLimitTo?.getTime();
      let current = new Date(currentYear, currentMonth, dateNumber);
      let curr = current.getTime();

      if (from && to) {
        return (curr >= from) && (curr <= to);
      } else if (from) {
        return curr >= from
      } else if (to) {
        return curr <= to
      }
    }

    
    return true;

  }
 

</script>

<div class='calendar' style={ getStylingOptions(styles) }>
  

  <div class='month-and-year-wrapper'>

    <div class="buttons-wrapper">
      <button class='change-month-button' on:mouseup={prev} title="Pres Shift or Alt to swith year or decade" tabindex="-1">
        {#if !$$slots.previousMonth}
          <span class="change-month-button-content">
            <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.02332 9.99999L13.1483 14.125L11.97 15.3033L6.66666 9.99999L11.97 4.69666L13.1483 5.87499L9.02332 9.99999Z" />
            </svg>
          </span>
        {:else}
          <slot name="previousMonth"></slot>
        {/if}

      </button>
    </div>

    <div class="month-and-year" on:mouseup={reset} title="Meta + click: Reset month and year">
      <div class='month'>{months[currentMonth]}</div>
      <div class='year'>{currentYear}</div>
    </div>

    <div class="buttons-wrapper">

      <button class='change-month-button' on:mouseup={next} title="Pres Shift or Alt to swith year or decade" tabindex="-1">
        {#if !$$slots.nextMonth}
          <span class="change-month-button-content">
            <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9767 9.99999L6.85168 5.87499L8.03002 4.69666L13.3334 9.99999L8.03002 15.3033L6.85168 14.125L10.9767 9.99999Z" />
            </svg>
          </span>
        {:else}
          <slot name="nextMonth"></slot>
        {/if}
      </button>

    </div>

  </div>


  <div class="month-view">
    <div class="week">
      {#each getWeekDays(weekStartsFrom) as weekday, index}
        <div class="weekday">
          <div class="weekday-inner">
            {weekday.title}
          </div>
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
              ${checkDateLimitation(day.dateNumber) ? 'active' : 'disabled'}
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
            on:mouseup={(e) => { 
              if (checkDateLimitation(day.dateNumber)) {
                day.dayType === 'currentMonth' && setDate(e, day.dateNumber)
              }
            }}
          >
            <div class="day-inner">
              {day.dateNumber}
            </div>
          </div>
        {/each}
      {/each}
    </div>
  </div>

  {#if showDescription}
    <div class="description">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00001 14.6667C4.31801 14.6667 1.33334 11.682 1.33334 8.00001C1.33334 4.31801 4.31801 1.33334 8.00001 1.33334C11.682 1.33334 14.6667 4.31801 14.6667 8.00001C14.6667 11.682 11.682 14.6667 8.00001 14.6667ZM8.00001 13.3333C9.4145 13.3333 10.7711 12.7714 11.7712 11.7712C12.7714 10.7711 13.3333 9.4145 13.3333 8.00001C13.3333 6.58552 12.7714 5.22897 11.7712 4.22877C10.7711 3.22858 9.4145 2.66668 8.00001 2.66668C6.58552 2.66668 5.22897 3.22858 4.22877 4.22877C3.22858 5.22897 2.66668 6.58552 2.66668 8.00001C2.66668 9.4145 3.22858 10.7711 4.22877 11.7712C5.22897 12.7714 6.58552 13.3333 8.00001 13.3333V13.3333ZM7.33334 4.66668H8.66668V6.00001H7.33334V4.66668ZM7.33334 7.33334H8.66668V11.3333H7.33334V7.33334Z" fill="#B1B1B1"/>
      </svg>
      Use Shift or Alt to change year or decade. Alt + click on month to reset to current
    </div>
  {/if}


</div>

<style lang='scss'>

  * {
    box-sizing: border-box;
  }

  .description {
    font-size: .75em;
    color: var(--textColorSecondary);
    padding: var(--spacingBase) 0;

    > svg {
      position: relative;
      top: 3px;
    }
  }

  .calendar {
    position: relative;
    font-size: var(--baseFontSize);
    border-radius: var(--radiusPanel);
    box-shadow: 0 0 1.5em rgba(0,0,0,0.1);
    width: calc(7 * 1.5em + 14 * var(--spacingBase));
    padding: var(--spacingCalendarPadding);
    box-sizing: content-box;
    color: var(--textColorBase);
  }

  .month-view {
    display: flex;
    flex-wrap: wrap;
  }

  .week {
    display: flex;
  }

  .weekday {
    padding: var(--spacingBase);
    line-height: 1.5;
    font-size: .75em;
    text-align: center;
    color: var(--textColorSecondary);

    .weekday-inner {
      width: 2em;
      font-size: inherit;
      line-height: 1.5;
    }
  }

  .day {
    padding: var(--spacingBase);
    background: var(--surfaceColorDateActive100);
    text-align: center;
    cursor: pointer;
    transition: all .1s ease-in-out;

    &.currentMonth {
      &:hover {
        background: var(--surfaceColorDateActive200);
      }
      &:active {
        background: var(--surfaceColorDateActive200);
      }
    }

    &.today {
      box-shadow: inset 0 0 0 1px var(--lineColorPrimary); // line
      color: var(--textColorPrimary);
      &.in-range, &.selected-day, &.selected-day-sec {
        color: var(--textColorPrimaryInverted);
      }
    }

    &.in-range {
      background-color: var(--inRangeBg100);
      color: var(--textColorBaseInverted);
      &:hover {
        background-color: var(--inRangeBg200);
      }
    }

    &.selected-day, &.selected-day-sec {
      background-color: var(--surfaceColorDateFrame100);
      color: var(--textColorBaseInverted);
       &:hover {
        background: var(--surfaceColorDateFrame200);
      }
    }

    &.disabled {
      opacity: var(--disabledDaysOpacity);
      cursor: default;
      &:hover, &:active {
        background: transparent;
      }
    }

    &.previousMonth, &.nextMonth {
      opacity: var(--otherMonthsOpacity);
      cursor: default;
    }

    .day-inner {
      width: 1.5em;
      font-size: inherit;
      line-height: 1.5;
    }
    
  }

  .month-and-year-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .75em;

    .month-and-year {
      display: flex;
      gap: .5em;
      padding: var(--spacingSmall) calc(1.5 * var(--spacingBase));
      border-radius: var(--radiusControl);
      transition: background .2s ease-in-out;
      cursor: pointer;
      line-height: 1.5;
      &:hover {
        background: var(--surfaceColorDateActive100);
      }

    }

    .buttons-wrapper {
      display: flex;
    }

    .change-month-button {
      padding: var(--spacingBase) var(--spacingSmall);
      border-radius: var(--radiusControl);
      background: var(--surfaceColorBase);
      font-size: var(--baseFontSize);
      transition: background .1s ease-in-out;
      border: none;
      cursor: pointer;
      &:hover {
        background: var(--surfaceColorDateActive100);
      }
      &:active {
        background: var(--surfaceColorDateActive200);
      }

      .change-month-button-content {
        line-height: 0;
        display: block;
        svg path {
          fill: var(--textColorSecondary);
        }
      }

    }

  }

</style>
