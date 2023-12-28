<script lang="ts">
  import { Calendar, DateRangePicker } from '../lib';
  import '../style/main.scss';

  let dateSingle: Date | undefined = new Date(2023, 10, 3);
  const changeDateHandler = (dateStart?: Date) => {
    dateSingle = dateStart;
  }

  let datePrimary: Date | undefined = new Date(2024, 8, 20);
  let dateSecondary: Date | undefined = new Date(2024, 10, 20);
  let onChange = (date1?: Date, date2?: Date) => {
    datePrimary = date1;
    dateSecondary = date2;
  }

  let datePrimaryLimited: Date | undefined = new Date(2024, 8, 20);
  let dateSecondaryLimited: Date | undefined = new Date(2024, 10, 20);
  let onChangeLimited = (date1?: Date, date2?: Date) => {
    datePrimaryLimited = date1;
    dateSecondaryLimited = date2;
  }
  let dateLimitation = [new Date(), new Date(2024, 3, 8)];

</script>

<div class="container">
  <div class="box">

    <h1 style="margin-bottom: 2rem">Calendar showcase</h1>

    <div style="margin-bottom: 1rem; width: 280px;">
      <DateRangePicker
        weekStartsFrom="Monday"
        uniqID='dropdown-001'
        name='dropdown-001'
        datePrimary={dateSingle}
        dateSecondary={undefined}
        onChange={changeDateHandler}
        dateLimitation={[new Date(), null]}
        dateRange={false}
        styles={{
          baseFontSize: '24px',
        }}
      />
    </div>
    <div style="margin-bottom: 1rem; width: 280px;">
      <DateRangePicker
        dateRange={true}
        uniqID='dropdown-002'
        name='dropdown-002'
        {datePrimary}
        {dateSecondary}
        onChange={onChange}
      />
    </div>

    <div class="panel">
      <div>
        <div class="tbd-calendar">
          <h2>Date picker panel 1</h2>
          <Calendar
              name="calendar-001"
              weekStartsFrom="Monday"
              datePrimary={dateSingle}
              onChange={changeDateHandler}
              styles={{
                baseFontSize: '14px'
              }}>
            <span slot="previousMonth" style="color: blue">
              Previous
            </span>
            <span slot="nextMonth" style="color: blue">
              Next
            </span>
          </Calendar>
        </div>
      </div>
      <div>
        <h2>Date picker panel 2</h2>
        <Calendar name="calendar-002" datePrimary={dateSingle} onChange={changeDateHandler} />
      </div>

      <div>
        <h2>Date-range picker panel 1</h2>
        <Calendar
          name="calendar-003"
          dateRange={true}
          datePrimary={datePrimary}
          dateSecondary={dateSecondary}
          onChange={onChange}
          dateLimitation={[new Date(), null]}
          showDescription={false}
        />
      </div>

      <div>
        <h2>Date-range picker panel 2</h2>
        <Calendar
            name="calendar-004"
            dateRange={true}
            weekStartsFrom="Monday"
            datePrimary={datePrimaryLimited}
            dateSecondary={dateSecondaryLimited}
            onChange={onChangeLimited}
            dateLimitation={dateLimitation}
            styles={{
              surfaceColorDateFrame100: 'rgba(220, 10, 10)',
              surfaceColorDateFrame200: 'rgba(200, 10, 10)',
              surfaceColorDateSelection100: 'rgba(255, 50, 50)',
              surfaceColorDateSelection200: 'rgba(235, 50, 50)',
            }}
        />
      </div>

    </div>
  </div>

</div>


<style lang="scss">
  .panel {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
