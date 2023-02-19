<script lang="ts">
  import { basket } from "@utils/stores";
  import { onSet } from "nanostores";

  import { onMount } from "svelte";

  let innerWidth;

  let paymentTotal = 0;
  let roomCount = 0;
  let guestTotal = 0;

  function hideBooking() {
    document.body.classList.remove("mobile-show-booking");

    basket.setKey("mobilePicerVisible", false);
  }
  function showBooking() {
    document.body.classList.add("mobile-show-booking");

    basket.setKey("mobilePicerVisible", true);
  }

  function doBookingShow(event: Event) {
    const visible = $basket.mobilePicerVisible;

    const bookingSummary = document.querySelector(".booking-summary");

    if (visible) {
      hideBooking();
    } else {
      showBooking();
    }
  }

  function onResize() {
    if (innerWidth >= 1024 && $basket.mobilePicerVisible) {
      hideBooking();
    }
  }

  function updateTotal(rooms: any[]) {
    if (Array.isArray(rooms)) {
      paymentTotal = rooms
        ? rooms
            .map((r) => {
              return r.totalPrice;
            })
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;

      roomCount = rooms?.length || 0;
      guestTotal = rooms
        ? rooms
            .map((r) => {
              return r.guest;
            })
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
      console.log(paymentTotal);
    }
  }
  updateTotal($basket?.rooms || []);

  onMount(() => {
    window.addEventListener("resize", onResize);

    onSet(basket, ({ newValue, abort }) => {
      console.log("newValue : ", newValue);
      updateTotal(newValue?.rooms || []);
    });
  });
</script>

<!-- booking-summary -->

<svelte:window bind:innerWidth />

<button
  id="selectionsText"
  on:click={doBookingShow}
  class="flex flex-col justify-center self-stretch p-0 font-sans text-base font-normal text-left text-black bg-none cursor-pointer md:pl-2 scroll-smooth"
>
  <div class="md:mr-5 scroll-smooth" style="line-height: normal;">
    <div class="scroll-smooth">
      <!---->
    </div>
    <div class="scroll-smooth">
      <span
        class="overflow-hidden absolute p-0 -m-px w-px h-px border-0 scroll-smooth"
        style="clip: rect(0px, 0px, 0px, 0px); outline: 0px;"
        >EUR&nbsp;{parseFloat("" + paymentTotal).toFixed(2)}</span
      ><span aria-hidden="true" class="px-px font-bold scroll-smooth"
        >EUR&nbsp;{parseFloat("" + paymentTotal).toFixed(2)}</span
      >
    </div>
  </div>
  <span class="mt-0 text-sm scroll-smooth text-stone-500"
    ><span class="scroll-smooth"
      >{roomCount} room{roomCount > 1 ? "s" : ""}</span
    >,
    <span class="scroll-smooth"
      >{guestTotal} guest{guestTotal > 1 ? "s" : ""}</span
    >
    <svg
      version="1.1"
      viewBox="0 0 24 24"
      class="inline-block ml-1 w-2 h-4 not-italic normal-case align-baseline pointer-events-none scroll-smooth"
      focusable="false"
      aria-hidden="true"
      style="width: 10px; fill: currentcolor; stroke: none; speak: none; font-variant: normal; font-family: element-icons;"
    >
      <path
        fill="#1E3136"
        stroke="none"
        d="M23.998 5.5a.493.493 0 01-.126.332l-11.5 13a.5.5 0 01-.748 0l-11.5-13a.5.5 0 01.749-.663l11.125 12.577L23.124 5.17a.5.5 0 01.874.332z"
        data-name="Outline Icons"
        class="scroll-smooth"
        style="font-family: element-icons;"
      />
    </svg>
  </span>
</button>

<style lang="postcss">
  :global(body.mobile-show-booking) {
    overflow-y: hidden;
  }
</style>
