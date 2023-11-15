<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { clickOutsideHandler } from '$lib/utils';
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';

  export let uniqID: string;
  export let name: string;

  let isFocused = false;

  let dateStart: Date | undefined;
  let dateEnd: Date | undefined;
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

  const changeDate2Handler = (date1?: Date, date2?: Date) => {
    dateStart = date1 ? date1 : dateStart;
    dateEnd = date2 ? date2 : dateEnd;
  }

  $: {

    if (dateStart && dateEnd) {
      if (dateStart.valueOf() > dateEnd.valueOf()) {
        // exchange values with buffer
        let buffer = dateStart;
        dateStart = dateEnd;
        dateEnd = buffer;
      }
    }

    if (dateStart) {
      dateStartDate = dateStart.getDate();
      dateStartMonth = dateStart.getMonth()+1;
      dateStartYear = dateStart.getFullYear();
    }

    if (dateEnd) {
      dateEndDate = dateEnd.getDate();
      dateEndMonth = dateEnd.getMonth()+1;
      dateEndYear = dateEnd.getFullYear();
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
      (dateStart ? `${dateStartDate} / ${dateStartMonth} / ${dateStartYear}` : 'Start date') + ' - ' +
      (dateEnd ? `${dateEndDate} / ${dateEndMonth} / ${dateEndYear}` : 'End date')}
  />

  <div class="dropdown-wrapper">
    <Dropdown {showDropdown} hideDropdown={() => showDropdown = false} clickOutside={false} uniqID={uniqID + 'dropdown'}>
      <div slot="DropdownContent">
        <div>
          <Calendar 
            dateRange={true} 
            dateStart={dateStart} 
            dateEnd={dateEnd} 
            onChange={changeDate2Handler}
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
