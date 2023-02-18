<script lang="ts">
  export let depositTotal;
  export let totalAmount;
  export let currency;
  export let decimals;
  export let ccSurcharge;
</script>

<section class="total">
  <div class="mb-3">
    <div class="total-content">
      <div class="total-text">Total</div>
      <div class="total-value">EUR&nbsp;2,001.19</div>
    </div>
  </div>

  <div tabindex="-1" class="tip">
    <div class="tip-text">Book now, pay later!</div>
    <div class="tip-balance">Outstanding balance: EUR&nbsp;2,001.19</div>
  </div>
</section>

<style lang="postcss">
  .total {
    @apply pb-4 leading-5 text-zinc-800;
  }
  .total-content {
    @apply inline-block pt-4 -mb-2 w-full text-base leading-6;
  }
  .total-text {
    @apply float-left font-bold;
  }
  .total-value {
    @apply float-right pl-4 font-bold;
  }

  .tip {
    @apply p-4 text-sm bg-violet-50 rounded border-transparent border-solid pointer-events-none relative;
  }

  .tip:before {
    content: " ";
    @apply w-0 h-0 absolute border-solid border-8 border-transparent pointer-events-none;
    border-bottom-color: theme("colors.violet.50");
    top: -16px;
    right: 20px;
    z-index: 2;
  }

  .tip-text {
    @apply font-semibold leading-6;
  }
  .tip-balance {
    @apply font-semibold;
  }
</style>
