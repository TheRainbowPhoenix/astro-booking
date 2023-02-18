<script lang="ts">
  import { t } from "@utils/i18n";
  import BalanceTotal from "./BalanceTotal.svelte";
  import CheckInCheckOutDates from "./CheckInCheckOutDates.svelte";
  import GrandTotalHeading from "./GrandTotalHeading.svelte";
  import OccupancyRoom from "./OccupancyRoom.svelte";
  import RoomsSection from "./RoomsSection.svelte";

  import { basket } from "@utils/stores";

  function doBookingHide(event: Event) {
    const visible = $basket.mobilePicerVisible;

    document.body.classList.remove("mobile-show-booking");
    basket.setKey("mobilePicerVisible", false);
  }

  let perBookingExtras = [];
  let perPersonExtras = [];
  let fixedTaxes = [];

  let paymentTotal = 2001.99;

  let checkInDate = "Mon, 13 Mar 23";
  let checkOutDate = "Wed, 15 Mar 23";

  function toCurrency(value) {
    return `EUR ${value}`;
  }

  function onClick(event: MouseEvent) {}
</script>

<div class="booking-summary" tabindex="-1">
  <div class="mobile-header">
    <div class="mobile-header-title">Booking summary</div>

    <div class="header-default">
      <button
        on:click={doBookingHide}
        type="button"
        class="close-btn"
        style="text-rendering: optimizelegibility; outline: 0px; transition: all 0.1s ease 0s; text-decoration: none; background-position: 0px center; bottom: -5px;"
      >
        <svg
          version="1.1"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 not-italic font-normal text-center normal-case align-middle cursor-pointer pointer-events-none scroll-smooth"
          focusable="false"
          aria-label="close"
          style="width: 16px; height: 16px; text-rendering: optimizelegibility; fill: currentcolor; stroke: none; speak: none; font-variant: normal; font-family: sputnik-fa;"
        >
          <path
            d="M12 10.02l7.61-7.61a1.4 1.4 0 011.98 1.98L13.98 12l7.61 7.61a1.4 1.4 0 11-1.98 1.98L12 13.98l-7.61 7.61a1.4 1.4 0 11-1.98-1.98L10.02 12 2.41 4.39a1.4 1.4 0 111.98-1.98L12 10.02z"
            fill="#717171"
            fill-rule="evenodd"
            class="leading-3 text-orange-400 scroll-smooth"
            style="text-rendering: optimizelegibility; font-family: sputnik-fa;"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="booking-summary-heading">
    <GrandTotalHeading value={toCurrency(paymentTotal)} />
  </div>

  <div class="booking-summary-body">
    <section class="section pb-4">
      <CheckInCheckOutDates
        check_in_date={checkInDate}
        check_out_date={checkOutDate}
        is_stack_layout={false}
        show_number_of_nights={true}
      />
      <OccupancyRoom rooms={2} occupancy={4} />
    </section>

    <div class="room-selection">
      <section class="section">
        <RoomsSection />
      </section>
      {#each perBookingExtras as extra}
        <section :key="extra.uuid">
          <line-item
            unbold-name="true"
            item-name="extra.name"
            value="toCurrency(undefined)"
          />
        </section>
      {/each}
      {#each perPersonExtras as extra}
        <section :key="extra.uuid">
          <line-item
            unbold-name="true"
            item-name="extra.name"
            value="toCurrency(undefined)"
          />
        </section>
      {/each}
      <section>
        <add-ons-section
          all-selected-optional-extras="allSelectedOptionalExtras"
          currency="currency"
          extras-dictionary="extrasDictionary"
        />
      </section>
      {#each fixedTaxes as extra}
        <section :key="tax.uuid">
          <line-item
            unbold-name="true"
            item-name="tax.name"
            value="toCurrency(undefined)"
          />
        </section>
      {/each}
      <section no-line="true">
        <grand-total-section
          total="paymentTotal"
          currency="currency"
          decimals="decimals"
          taxes-and-fees="percentTaxesAndFees"
        />
        <BalanceTotal
          depositTotal="depositTotal"
          totalAmount="paymentTotal"
          currency="currency"
          decimals="decimals"
          ccSurcharge="ccSurcharge"
        />
      </section>
    </div>
    <div class="container container--centralized" />
  </div>

  <div class="booking-summary-footer">
    <button class="btn-cta" on:click={onClick}>
      {$t("ReservationPage.BookingSummaryFooter.book_now_button_label")}
    </button>
  </div>
</div>

<style lang="postcss">
  .booking-summary {
    @apply bg-white px-4 pt-4 pb-0 border-solid rounded-lg border border-slate-300 hidden lg:block;
  }

  .booking-summary-body,
  .booking-summary-heading,
  .booking-summary-footer {
    @apply mx-4 md:mx-auto lg:mx-0 md:max-w-[400px] lg:max-w-none;
  }

  .booking-summary-heading {
    @apply mt-4 lg:mt-0;
  }

  .mobile-header {
    @apply relative hidden justify-between items-end py-2 pr-5 pl-0 text-lg leading-7 text-zinc-800;
    @apply my-0 mx-4 text-lg bg-white border-b border-solid border-zinc-300;
  }

  .close-btn {
    @apply inline-block absolute -right-4 py-2 px-0 m-0 w-12 h-12 font-sans text-sm font-medium leading-none text-center whitespace-nowrap rounded border border-transparent border-solid appearance-none cursor-pointer select-none scroll-smooth text-sky-600 focus:border-transparent focus:bg-transparent focus:text-sky-700 hover:border-transparent hover:bg-transparent hover:text-sky-700;
  }

  .mobile-header-title {
    @apply text-lg leading-7 text-zinc-800 w-full;
  }

  .header-default {
    @apply flex justify-between items-center w-full leading-3 scroll-smooth text-zinc-800;
  }

  :global(body.mobile-show-booking .mobile-header) {
    @apply visible flex lg:hidden;
  }

  :global(body.mobile-show-booking .booking-summary) {
    @apply fixed lg:relative w-full lg:w-auto h-full lg:h-auto top-0 block pt-4 rounded-none border-none;
  }

  .section {
    @apply border-0 border-b border-solid border-slate-300;
  }

  .booking-summary-footer {
    @apply py-4 leading-5 text-zinc-800;
  }

  .btn-cta {
    @apply relative p-0 -my-1 w-full font-sans text-xl font-bold text-center bg-none border-0 cursor-pointer py-2 px-6 m-0 leading-6 text-white normal-case bg-fuchsia-800 hover:bg-fuchsia-700 transition-all ease-in-out duration-150 rounded-lg;
  }
</style>
