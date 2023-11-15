<script lang="ts">
  import { Calendar, DateRangePicker } from '../lib';
  import '../style/main.scss';

  const changeDateHandler = (dateStart?: Date, dateEnd?: Date) => {

  }


</script>

<div class="container">
  <div class="box">

    <h1 style="margin-bottom: 2rem">Calendar showcase</h1>

    <div class="panel">
      <div>
        <h2>Date picker panel</h2>
        <Calendar dateStart={new Date(2023, 10, 2)} onChange={changeDateHandler} />
      </div>
      <div>
        <h2>Date-range picker panel</h2>
        <Calendar
          dateRange={true}
          dateStart={new Date(2023, 10, 2)}
          dateEnd={new Date(2023, 10, 10)}
          onChange={changeDateHandler}
        />
      </div>
    </div>
  </div>

  <div style="margin-bottom: 1rem; width: 280px;">
    <DateRangePicker uniqID='dropdown-001' name='dropdown-001' />
  </div>
  <div style="margin-bottom: 1rem; width: 280px;">
    <DateRangePicker uniqID='dropdown-002' name='dropdown-002'/>
  </div>

</div>


<style lang="scss">
  .panel {
    display: flex;
    gap: 2rem;
  }
</style>
