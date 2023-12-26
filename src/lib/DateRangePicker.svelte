<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { clickOutsideHandler } from '$lib/utils';
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import type { ICalendarOptions } from "$lib/CalendarStylingOptions";
  import type { WeekStartsFrom } from "$lib/Calendar";

  export let uniqID: string;
  export let name: string;
  export let datePrimary: Date | undefined;
  export let dateSecondary: Date | undefined;
  export let onChange: (dateStart?: Date, dateEnd?: Date) => void;
  export let styles: ICalendarOptions = {};
  export let weekStartsFrom: WeekStartsFrom = 'Sunday';
  export let dateLimitation: (Date | null)[] = [null, null];
  export let showDescription: boolean = true;

  let isFocused = false;
  let showDropdown = false;

  let dateStartDate: number;
  let dateStartMonth: number;
  let dateStartYear: number;

  let dateEndDate: number;
  let dateEndMonth: number;
  let dateEndYear: number;

  onMount(() => document.addEventListener('mousedown', handleClickOutside));
  onDestroy(() => browser && document.removeEventListener('mousedown', handleClickOutside));
  const handleClickOutside = (event: MouseEvent) => clickOutsideHandler(event, uniqID, () => showDropdown = false);

  const changeDateHandler = (date1?: Date, date2?: Date) => {
    onChange && onChange(date1 ? date1 : datePrimary, date2 ? date2 : dateSecondary);
  }

  $: {

    if (datePrimary && dateSecondary) {
      if (datePrimary.valueOf() > dateSecondary.valueOf()) {
        // exchange values with buffer
        let buffer = datePrimary;
        datePrimary = dateSecondary;
        dateSecondary = buffer;
      }
    }

    if (datePrimary) {
      dateStartDate = datePrimary.getDate();
      dateStartMonth = datePrimary.getMonth()+1;
      dateStartYear = datePrimary.getFullYear();
    }

    if (dateSecondary) {
      dateEndDate = dateSecondary.getDate();
      dateEndMonth = dateSecondary.getMonth()+1;
      dateEndYear = dateSecondary.getFullYear();
    }
    
  }

  const mouseUpHandler = () => {
    if (!isFocused) {
      showDropdown = !showDropdown;
    }
  }

  const focusHandler = () => {
    isFocused = true;
    showDropdown = true;
  }

  const blurHandler = () => {
    isFocused = false;
  }
</script>

<div class="DateRangePicker" id={uniqID}>

  <input
    {name} type="text" readonly
    class="date-range-picker-value"
    on:mouseup={mouseUpHandler}
    on:focus={focusHandler}
    on:blur={blurHandler}
    placeholder="Start date - End date"
    value={
      (datePrimary ? `${dateStartDate} / ${dateStartMonth} / ${dateStartYear}` : 'Start date') + ' - ' +
      (dateSecondary ? `${dateEndDate} / ${dateEndMonth} / ${dateEndYear}` : 'End date')}
  />

  <div class="dropdown-wrapper">
    <Dropdown {showDropdown} hideDropdown={() => showDropdown = false} clickOutside={false} uniqID={uniqID + 'dropdown'}>
      <div slot="DropdownContent">
        <div>
          <Calendar
            {styles}
            {weekStartsFrom}
            dateRange={true} 
            {datePrimary}
            {dateSecondary}
            onChange={changeDateHandler}
            {dateLimitation}
            {showDescription}
            {name}
          />
        </div>
      </div>
    </Dropdown>
  </div>

  <div>
    Content after
  </div>

</div>

<style lang="scss">

  .DateRangePicker {

  }

  .dropdown-wrapper {
    position: relative;
  }

  input.date-range-picker-value {
    padding: .5rem;
    border: none;
    border-radius: 6px;
    background: #f2f4f6;
    font-size: inherit;
    width: 100%;
    cursor: pointer;
    margin-bottom: .25rem;
  }

</style>
