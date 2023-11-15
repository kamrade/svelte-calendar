<script lang="ts">
  import { Calendar, DateRangePicker } from '../lib';
  import '../style/main.scss';

  const changeDateHandler = (dateStart?: Date, dateEnd?: Date) => {
    console.log("Date: ", dateStart, dateEnd);
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

  <DateRangePicker />
  <DateRangePicker />

</div>


<style lang="scss">
  
</style>