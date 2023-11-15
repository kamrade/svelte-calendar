<script lang="ts">
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import '../style/main.scss';

  const changeDateHandler = (dateStart?: Date, dateEnd?: Date) => {
    console.log("Date: ", dateStart, dateEnd);
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

<div class="container">
  <div class="box">
    <h1>Calendar showcase</h1>
    <div style="display: flex; gap: .5rem">
      <Calendar dateStart={new Date(2023, 10, 2)} onChange={changeDateHandler} />
      <Calendar
        dateRange={true}
        dateStart={new Date(2023, 10, 2)}
        dateEnd={new Date(2023, 10, 10)}
        onChange={changeDateHandler}
      />
    </div>
  </div>
</div>


<div class="container">
  
  <button class="Button" on:mouseup={() => showDropdown = !showDropdown}>
    {dateStart ? `${dateStartDate} / ${dateStartMonth} / ${dateStartYear}` : 'Start date'}
    - {dateEnd ? `${dateEndDate} / ${dateEndMonth} / ${dateEndYear}` : 'End date'}
  </button>
  
  <div class="dropdown-wrapper">
    <Dropdown {showDropdown} hideDropdown={() => showDropdown = false}>
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
  
  .dropdown-wrapper {
    position: relative;
    margin-bottom: .5rem;
  }

</style>