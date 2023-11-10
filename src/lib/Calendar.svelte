<script lang="ts">
  import { compareAsc, format } from 'date-fns'

  format(new Date(2014, 1, 11), 'yyyy-MM-dd')
  //=> '2014-02-11'

  const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
  ]
 
  let sortedDates = dates.sort(compareAsc)

  let date = sortedDates[0]

  console.log( date );

  //=> [
  //   Wed Feb 11 1987 00:00:00,
  //   Mon Jul 10 1989 00:00:00,
  //   Sun Jul 02 1995 00:00:00
  // ]
</script>

<h1>This is the Svelte Calendar by D.Mykhailov {date}</h1>