<script lang="ts">
  export let occupancy = "";
  export let nights = "";
</script>

<div class="occupancy">
  <span>
    {occupancy} guests {nights} nights
  </span>
</div>

<style lang="postcss">
  .occupancy {
    @apply flex justify-between;
  }

  .occupancy span {
    @apply text-sm text-neutral-500;
  }
</style>
