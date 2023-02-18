<script lang="ts">
  import { t } from "@utils/i18n";
  import BalanceTotal from "./BalanceTotal.svelte";
  import CheckInCheckOutDates from "./CheckInCheckOutDates.svelte";
  import GrandTotalHeading from "./GrandTotalHeading.svelte";
  import OccupancyRoom from "./OccupancyRoom.svelte";
  import RoomsSection from "./RoomsSection.svelte";

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
    @apply bg-white px-4 pt-4 pb-0 border-solid rounded-lg border border-slate-300;
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
