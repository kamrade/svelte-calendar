<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { clickOutsideHandler } from './utils/click-outside-handler';
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';

  export let uniqID: string;

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  const handleClickOutside = (event: MouseEvent) => {
    clickOutsideHandler(event, 'DateRangePicker', () => showDropdown = false);
  }


  let dateStart: Date | undefined;
  let dateEnd: Date | undefined;
  let showDropdown = false;
  
  const changeDate2Handler = (date1?: Date, date2?: Date) => {
    dateStart = date1 ? date1 : dateStart;
    dateEnd = date2 ? date2 : dateEnd;
  }

  let dateStartDate: number;
  let dateStartMonth: number;
  let dateStartYear: number;

  let dateEndDate: number;
  let dateEndMonth: number;
  let dateEndYear: number;

  $: {

    if (dateStart && dateEnd) {
      if (dateStart.valueOf() > dateEnd.valueOf()) {
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
</script>

<div class="DateRangePicker">
  
  <button class="Button" on:mouseup={() => showDropdown = !showDropdown}>
    {dateStart ? `${dateStartDate} / ${dateStartMonth} / ${dateStartYear}` : 'Start date'}
    - {dateEnd ? `${dateEndDate} / ${dateEndMonth} / ${dateEndYear}` : 'End date'}
  </button>

  <div class="dropdown-wrapper">
    <Dropdown {showDropdown} hideDropdown={() => showDropdown = false} clickOutside={false} {uniqID}>
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
    display: inline-flex;
    flex-direction: column;
  }

  .dropdown-wrapper {
    position: relative;
  }
</style>