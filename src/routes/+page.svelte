<script lang="ts">
  import { Calendar, DateRangePicker } from '../lib';
  import '../style/main.scss';

  let datePanel1 = new Date(2023, 10, 3);
  const changeDateHandler = (dateStart?: Date, dateEnd?: Date) => {
    datePanel1 = dateStart;
  }

  let dateStart = new Date(1999, 8, 20);
  let dateEnd = new Date(2023, 10, 20);
  let onChange = (date1: Date, date2: Date) => {
    dateStart = date1;
    dateEnd = date2;
  }

</script>

<div class="container">
  <div class="box">

    <h1 style="margin-bottom: 2rem">Calendar showcase</h1>

    <div class="panel">
      <div>
        <h2>Date picker panel</h2>
        <Calendar dateStart={datePanel1} onChange={changeDateHandler} />
      </div>
      <div>
        <h2>Date picker panel</h2>
        <Calendar dateStart={datePanel1} onChange={changeDateHandler} />
      </div>

      <div>
        <h2>Date-range picker panel 1</h2>
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
    <DateRangePicker uniqID='dropdown-001' name='dropdown-001' dateStartIn={dateStart} dateEndIn={dateEnd} {onChange} />
  </div>
  <div style="margin-bottom: 1rem; width: 280px;">
    <DateRangePicker uniqID='dropdown-002' name='dropdown-002' dateStartIn={dateStart} dateEndIn={dateEnd} {onChange}/>
  </div>

</div>


<style lang="scss">
  .panel {
    display: flex;
    gap: 2rem;
  }
</style>
