<script lang="ts">
  import { t } from "@utils/i18n";
  import OccupancyLos from "./OccupancyLos.svelte";
  import Price from "./Price.svelte";
  import { basket } from "@utils/stores";
  import { onMount } from "svelte";
  import { onSet } from "nanostores";

  let cartItems = [];

  let unbindListener;

  function removeRoom(index: number) {
    console.log(cartItems, index);

    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      cartItems = [...cartItems];
      basket.setKey("rooms", cartItems);
    }
    console.log($basket.rooms);
  }
  function getCancellationDifferentiator(item: any) {
    return item?.cancellation || [];
  }

  function getTotalOccupancy(itel: any) {
    return "2"; // TODO
  }

  onMount(() => {
    unbindListener = basket.subscribe((value) => {
      console.log(value);
      cartItems = value.rooms;
    });

    onSet(basket, ({ newValue, abort }) => {
      console.log(newValue);
      cartItems = newValue.rooms;
    });

    cartItems = basket?.get()?.rooms || [];
    console.log(cartItems);
  });
</script>

<div class="summary-rooms">
  <h2 class="vh">{$t("BookingSummary.rooms_section_title_sronly")}</h2>
  {#each cartItems as item, index}
    <div class="room">
      <div class="box">
        <span class="name">
          <span class="room-type">{item.type}</span>
          <span class="rate-name">{item.name}</span>
        </span>

        <button
          class="btn-remove-room"
          on:click={(event) => {
            return removeRoom(index);
          }}
        >
          <svg
            aria-label={$t(
              "ReservationPage.Summary.remove_room_button_aria_label_sronly"
            )}
            version="1.1"
            viewBox="0 0 24 24"
            class="svg-icon svg-fill"
            focusable="false"
            style="width: 18px; height: 18px;"
            ><path
              fill="#717171"
              stroke="none"
              d="M19.2 7c0 .024 0 .047-.002.071l-.804 12.502c-.087 1.35-1.125 2.427-2.34 2.427H7.946c-1.217 0-2.253-1.073-2.34-2.427L4.802 7.071A1.13 1.13 0 014.8 7H4a1 1 0 110-2h3.009a1.8 1.8 0 01.121-.5l.497-1.243A2 2 0 019.484 2h5.223a2 2 0 011.857 1.257l.497 1.243c.066.164.106.332.122.5H20a1 1 0 010 2h-.8zM6.667 8L7.4 19.43c.02.308.273.57.545.57h8.108c.27 0 .525-.265.545-.57L17.333 8H6.667zm6.686 2.917c.041-.55.476-.96.972-.913.495.045.863.529.822 1.08l-.45 5.999c-.041.55-.476.96-.972.913-.495-.045-.863-.529-.822-1.08l.45-5.999zm-4.5.166c-.041-.55.327-1.034.822-1.08.496-.045.93.364.972.914l.45 6c.041.55-.327 1.034-.822 1.08-.496.045-.93-.364-.972-.914l-.45-6zM9.084 5h6.023l-.4-1H9.484l-.4 1z"
              fill-rule="evenodd"
            /></svg
          >
        </button>
      </div>
      <div class="details">
        <div>
          <div class="flex">
            <OccupancyLos occupancy={getTotalOccupancy(item)} nights="2" />
          </div>

          {#each getCancellationDifferentiator(item) as cancellation}
            <div data-key={`${index}-${cancellation.effect}`}>
              <span>
                {cancellation.message}
              </span>
            </div>
          {/each}
        </div>

        <div>
          <Price />
        </div>
      </div>
      <mandatory-inclusions-accordion />
    </div>
  {/each}
</div>

<style lang="postcss">
  .vh {
    @apply overflow-hidden absolute p-0 -m-px w-px h-px border-0;
  }

  .room {
    @apply py-4 mt-0;
  }

  .box {
    @apply flex justify-between;
  }

  .room-type::after {
    content: " - ";
  }

  .name {
    @apply block mb-4 text-base font-bold;
  }

  .btn-remove-room {
    @apply float-right relative p-0 w-12 h-12 font-sans text-sm text-center text-black bg-none border-0 cursor-pointer -top-3 -right-3;
  }

  .svg-icon {
    @apply inline-block w-4 h-4 align-middle pointer-events-none;
  }

  .svg-fill {
    fill: currentColor;
    stroke: none;
  }

  .details {
    @apply flex justify-between;
  }

  .summary-rooms {
    @apply mx-4 lg:mx-0;
  }
</style>
