<script lang="ts">
  import { Calendar, DateRangePicker } from '../lib';
  import '../style/main.scss';

  let dateSingle = new Date(2023, 10, 3);
  const changeDateHandler = (dateStart?: Date) => {
    dateSingle = dateStart;
  }

  let datePrimary: Date | undefined = new Date(1999, 8, 20);
  let dateSecondary: Date | undefined = new Date(2023, 10, 20);
  let onChange = (date1?: Date, date2?: Date) => {
    datePrimary = date1;
    dateSecondary = date2;
  }

</script>

<div class="container">
  <div class="box">

    <h1 style="margin-bottom: 2rem">Calendar showcase</h1>

    <div class="panel">
      <div>
        <h2>Date picker panel 1</h2>
        <Calendar datePrimary={dateSingle} onChange={changeDateHandler} />
      </div>
      <div>
        <h2>Date picker panel 2</h2>
        <Calendar datePrimary={dateSingle} onChange={changeDateHandler} />
      </div>

      <div>
        <h2>Date-range picker panel 1</h2>
        <Calendar
          dateRange={true}
          datePrimary={datePrimary}
          dateSecondary={dateSecondary}
          onChange={onChange}
        />
      </div>

      <div>
        <h2>Date-range picker panel 2</h2>
        <Calendar
            dateRange={true}
            datePrimary={datePrimary}
            dateSecondary={dateSecondary}
            onChange={onChange}
        />
      </div>

    </div>
  </div>

  <div style="margin-bottom: 1rem; width: 280px;">
    <DateRangePicker uniqID='dropdown-001' name='dropdown-001' dateStartIn={datePrimary} dateEndIn={dateSecondary} onChange={onChange} />
  </div>
  <div style="margin-bottom: 1rem; width: 280px;">
    <DateRangePicker uniqID='dropdown-002' name='dropdown-002' dateStartIn={datePrimary} dateEndIn={dateSecondary} onChange={onChange}/>
  </div>

</div>


<style lang="scss">
  .panel {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
