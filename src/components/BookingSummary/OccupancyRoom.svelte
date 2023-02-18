<script lang="ts">
  export let rooms: number;
  export let occupancy: number;
</script>

<div class="occupancy-rooms">
  {rooms} room{rooms > 1 && "s"}, {occupancy} guest{occupancy > 1 && "s"}
</div>

<style lang="postcss">
  .occupancy-rooms {
    @apply text-base font-medium leading-6;
  }
</style>
