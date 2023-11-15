<script lang="ts">
  import Calendar from '$lib/Calendar.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import '../style/main.scss';

  let date = new Date();
  let showDropdown = false;
</script>

<div class="container">
  <div class="box">
    <h1>Calendar showcase</h1>
    <div style="display: flex; gap: .5rem">
      <Calendar />
      <Calendar dateRange={true} />
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
          <Calendar />
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