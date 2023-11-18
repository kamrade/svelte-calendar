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
      <span class="change-month-button-content">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.02332 9.99999L13.1483 14.125L11.97 15.3033L6.66666 9.99999L11.97 4.69666L13.1483 5.87499L9.02332 9.99999Z" />
        </svg>
      </span>
    </button>
  </div>

  <div class="month-and-year" on:mouseup={reset} title="Meta + click: Reset month and year">
    <div class='month'>{months[currentMonth]}</div>
    <div class='year'>{currentYear}</div>
  </div>

  <div class="buttons-wrapper">
    <button class='change-month-button' on:mouseup={next} title="Pres Shift or Alt to swith year or decade" tabindex="-1">
      <span class="change-month-button-content">
        <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9767 9.99999L6.85168 5.87499L8.03002 4.69666L13.3334 9.99999L8.03002 15.3033L6.85168 14.125L10.9767 9.99999Z" />
        </svg>
      </span>
    </button>
  </div>

</div>


<style lang='scss'>
  
  .month-and-year-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    line-height: 0;
    cursor: pointer;
    &:hover {
      background: var(--surfaceColorDateActive100);
    }
    &:active {
      background: var(--surfaceColorDateActive200);
    }

    .change-month-button-content {
      display: block;
      svg path {
        fill: var(--textColorSecondary);
      }
    }

  }

</style>
