<script lang="ts">
  import { format, startOfMonth, endOfMonth } from 'date-fns';
  import { weekdays, getPreviousMonth, getNextMonth, weekdaysArray, getWeekday } from './Calendar';
  import MonthAndYear from './MonthAndYear.svelte';

  const d = new Date();
  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();
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

  let currentMonthDays: number[][] = [[],[],[],[],[],[]];

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

    // Helpers
    let currentMonthStartDayNumber = getWeekday(currentMonthStartDay);
    let weeks = Math.trunc((daysInCurrentMonth - (7 - currentMonthStartDayNumber)) / 7);
    let max = 0;
    let nextMax = 1;

    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        for (let j = 0; j < currentMonthStartDayNumber; j++) {
          currentMonthDays[i][j] = daysInPreviousMonth - currentMonthStartDayNumber + j + 1;
        }
        for (let j = currentMonthStartDayNumber; j < 7; j++) {
          max++;
          currentMonthDays[i][j] = j - currentMonthStartDayNumber + 1;
        }
      } else if (i > weeks) {
        
        for (let j = 0; j < 7; j++) {
          if (max < daysInCurrentMonth) {
            max++;
            currentMonthDays[i][j] = max;
          } else {
            currentMonthDays[i][j] = nextMax;
            nextMax++;
          } 
        }

      } else {
        for (let j = 0; j < 7; j++) {  
          max++;        
          currentMonthDays[i][j] = max;
        }
      }
    }
  }

  $: {

  }

  const prev = () => [currentMonth, currentYear] = getPreviousMonth(currentMonth, currentYear);
  const next = () => [currentMonth, currentYear] = getNextMonth(currentMonth, currentYear);

</script>

<div class='calendar'>
  
  <MonthAndYear {currentMonth} {currentYear} {prev} {next} />

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
          <div class="day">
            {day}
          </div>
        {/each}
      {/each}
    </div>
  </div>

</div>

<style lang='scss'>

  .calendar {
    position: relative;
    border-radius: 12px;
    box-shadow: 0 0 24px rgba(0,0,0,0.1);
    padding: 1rem;
    width: 280px;
  }

  .month-view {
    display: flex;
    flex-wrap: wrap;
  }

  .week {
    display: flex;
  }

  .weekday {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: .75rem;
    text-align: center;
    color: grey;
  }

  .day {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    background: #F4F5F6;

    &:hover {
      background: #DEE1E4;
    }
  }

</style>