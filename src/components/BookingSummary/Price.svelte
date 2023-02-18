<script lang="ts">
  export let price: string = "EUR 690.71";
</script>

<div class="price">
  <div class="text-right">
    <div class="scroll-smooth">
      <span class="vh">{price}</span><span
        aria-hidden="true"
        class="price-current">{price}</span
      >
    </div>
    <div class="scroll-smooth">
      <!---->
    </div>
  </div>
</div>

<style lang="postcss">
  .price {
    @apply leading-5 text-zinc-800;
  }

  .price-current {
    @apply px-px text-base font-normal;
  }

  .vh {
    @apply overflow-hidden absolute p-0 -m-px w-px h-px border-0;
  }
</style>
