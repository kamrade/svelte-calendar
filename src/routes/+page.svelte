<script lang="ts">
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import '../style/main.scss';

  const changeDateHandler = (dateStart?: Date, dateEnd?: Date) => {
    console.log("Date: ", dateStart, dateEnd);
  }

  let date = new Date();
  let showDropdown = false;
  const changeDate2Handler = (dateStart?: Date, dateEnd?: Date) => {
    if (dateStart) {
      date = dateStart;
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
    {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
  </button>
  <div class="dropdown-wrapper">
    <Dropdown {showDropdown} hideDropdown={() => showDropdown = false}>
      <div slot="DropdownContent">
        <div>
          <Calendar dateStart={date} onChange={changeDate2Handler} />
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