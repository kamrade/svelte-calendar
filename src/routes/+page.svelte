<script lang="ts">
  import Calendar from '$lib/Calendar.svelte';
  import '../style/main.scss';
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