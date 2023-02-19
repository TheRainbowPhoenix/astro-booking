<script lang="ts">
  import { basket } from "@utils/stores";
  import type { Room } from "../../types";

  export let room: Room;

  function selectRoom(ev: Event) {
    let rooms = $basket.rooms;
    rooms.push({
      type: "Sharing",
      name: room.name,
      totalPrice: 690.71,
      guest: 2,
      cancellation: [{ message: "Cancellation fee applies" }],
    });
    basket.setKey("rooms", rooms);

    console.log($basket.rooms);
  }
</script>

<button aria-label="Select Deluxe Room" on:click={selectRoom}>
  <div class="rate-cta">Select</div>
</button>

<style lang="postcss">
  button {
    @apply relative p-0 -my-1 font-sans text-center text-black bg-none border-0 cursor-pointer md:w-auto w-1/3;
    min-width: 48px;
    min-height: 48px;
  }

  .rate-cta {
    @apply py-2 px-6 m-0 text-base text-center text-white normal-case bg-fuchsia-800 hover:bg-fuchsia-700 transition-all ease-in-out duration-150 bg-none rounded-lg cursor-pointer;
  }
</style>
