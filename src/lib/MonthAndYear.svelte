<script lang='ts'>
  import { months } from "./Calendar";
  export let currentMonth: number;
  export let currentYear: number;
  export let prev: (e: MouseEvent) => void;
  export let next: (e: MouseEvent) => void;
  export let reset: (e: MouseEvent) => void;
</script>

<div class='month-and-year-wrapper'>
  <div class="buttons-wrapper">
    <button class='change-month-button' on:mouseup={prev} title="Pres Shift or Alt to swith year or decade" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.02332 9.99999L13.1483 14.125L11.97 15.3033L6.66666 9.99999L11.97 4.69666L13.1483 5.87499L9.02332 9.99999Z" fill="#323232" />
      </svg>
    </button>
  </div>

  <div class="month-and-year" on:mouseup={reset} title="Meta + click: Reset month and year">
    <div class='month'>{months[currentMonth]}</div>
    <div class='year'>{currentYear}</div>
  </div>

  <div class="buttons-wrapper">
    <button class='change-month-button' on:mouseup={next} title="Pres Shift or Alt to swith year or decade" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9767 9.99999L6.85168 5.87499L8.03002 4.69666L13.3334 9.99999L8.03002 15.3033L6.85168 14.125L10.9767 9.99999Z" fill="#323232" />
      </svg>
    </button>
  </div>
</div>


<style lang='scss'>
  $color-bg-day-100: #F4F5F6;
  
  .month-and-year-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .month-and-year {
      display: flex;
      gap: .5rem;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 6px;
      transition: background .2s ease-in-out;

      &:hover {
        background-color: $color-bg-day-100;
      }
    }
  }

  .buttons-wrapper {
    display: flex;
  }

  .change-month-button {
    border: none;
    padding: 8px 4px;
    line-height: 0;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: background .1s ease-in-out;
    &:hover {
      background: #f7f7f7;
    }
    &:active {
      background: #f4f4f4;
    }
  }

</style>
