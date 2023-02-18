<script lang="ts">
  export let check_in_date = "";
  export let check_out_date = "";
  export let is_stack_layout: boolean = false;
  export let show_number_of_nights: boolean = true;
</script>

<div class="dates-night" class:sticky={is_stack_layout}>
  <div class="dates">
    {check_in_date} – {check_out_date}
  </div>

  {#if show_number_of_nights}
    <div class="total-nights">2 nights</div>
  {/if}
</div>

<style lang="postcss">
  .dates-night {
    @apply flex justify-between font-normal;
  }

  .dates {
    @apply mb-2;
  }
</style>
