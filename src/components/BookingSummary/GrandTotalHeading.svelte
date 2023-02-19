<script lang="ts">
  export let value: string = "";
</script>

<div class="grand-total-heading">
  <span aria-hidden="true" class="amount"> {value}</span><span
    aria-hidden="true"
    class="title">total</span
  ><span class="vh">Your booking total is {value}</span>
</div>

<style lang="postcss">
  .grand-total-heading {
    @apply mb-3 shrink-0;
  }

  .amount {
    @apply text-xl font-bold;
  }

  .title {
    @apply ml-1 text-lg font-bold leading-7;
  }

  .vh {
    @apply overflow-hidden absolute p-0 -m-px w-px h-px border-0;
  }
</style>
