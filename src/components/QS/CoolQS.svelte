<script lang="ts">
  import Flatpickr from "./Pickr.svelte";
  import { French } from "flatpickr/dist/l10n/fr";

  // import prices from "~api/prices";

  let prices = {
    start: Date.now(),
    list: [
      ...Array.from(Array(120).keys()).map((v) => {
        return { price: 120 + ((v / 4) % 6) + ((v / 10) % 8) };
      }),
    ],
  };

  let value: string = "2020-02-20",
    formattedValue: string,
    flatpickr: any;

  let multiple = false;

  let options: {
    mode: string;
    enableTime: boolean;
  };

  const findPriceFor = (day: Date): string => {
    let start = prices.start;
    let maxDays = parseInt((day - start) / (1000 * 60 * 60 * 24), 10);

    if (maxDays >= 0 && maxDays < prices.list.length) {
      return prices.list[maxDays].price + " €";
    }
    return "-";
  };

  $: options = {
    mode: "range", // multiple ? "multiple" : "single",
    locale: French,
    enableTime: false,
    minDate: "today",
    defaultDate: [new Date(), new Date().setDate(new Date().getDate() + 2)],
    showMonths: 2,
    monthSelectorType: "dropdown",
    altInput: true,
    altFormat: "Y-m-d",
    allowInput: true,
    onChange(selectedDates: [Date], dateStr: string) {
      console.log("flatpickr hook");
    },
    onOpen() {
      console.log("opened");
    },
    onDayCreate(dayObj: [Date], dayStr: string, fp: any, dayElem: any) {
      let price = (dayElem?.dateObj && findPriceFor(dayElem.dateObj)) || "-";
      dayElem.className += " qs-price-container";
      dayElem.innerHTML += `<div class="price">${price || "-"}</div>`;
    },
    onMonthChange() {
      console.log("Month changed");
    },
    onYearChange() {
      console.log("Year changed");
    },
    onClose(selectedDates: [Date], dateStr: string, fp: any) {
      console.log(fp);
    },
  };

  $: console.log({ value, formattedValue });

  function handleOpen(event: MouseEvent) {
    event.preventDefault();

    if (flatpickr) {
      flatpickr.open();
      flatpickr.calendarContainer.focus();
    }
  }

  function handleChange(event: CustomEvent) {
    const [selectedDates, dateStr] = event.detail;
    console.log({ selectedDates, dateStr });
  }

  function handleKey(event: KeyboardEvent) {
    console.log(event);
    if (flatpickr) {
      flatpickr.open();
      flatpickr.calendarContainer.focus();
    }
  }

  function handleClear() {
    if (flatpickr) {
      flatpickr.clear();
    }
  }

  function forceOpen() {
    if (flatpickr) {
      flatpickr.open();
      flatpickr.calendarContainer.focus();
    }
  }

  function handleClose() {
    if (flatpickr) {
      flatpickr.close();
    }
  }

  //   class FlatPickrFromControlElement extends

  function handleSubmit(event: SubmitEvent) {
    console.log(event);
    console.log(typeof event);
    event.preventDefault();

    console.log(event.target?.elements?.date?.value);
  }
</script>

<div class="ab-main-qs">
  <div class="ab-qs-date">
    <label class="ab-qs-label" for="ab-qs-input">
      <span aria-hidden="true">Pick Dates</span>
    </label>
    <div
      id="ab-qs-input"
      class="ab-qs-input"
      on:click={handleOpen}
      on:keypress={handleKey}
      on:focus={forceOpen}
      on:blur={handleClose}
    >
      <span class="ab-qs-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
          class="w-6 h-6"
          viewBox="0 0 16 16"
          ><path
            fill="currentColor"
            d="M5.248 8.997a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497Zm.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0ZM8 8.996A.748.748 0 1 0 8 7.5a.748.748 0 0 0 0 1.497Zm.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0Zm2-1.752a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497ZM14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7ZM3 6h10v5.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5V6Zm1.5-3h7A1.5 1.5 0 0 1 13 4.5V5H3v-.5A1.5 1.5 0 0 1 4.5 3Z"
          /></svg
        >
      </span>
      <Flatpickr
        {options}
        bind:value
        bind:formattedValue
        on:change={handleChange}
        name="date"
        bind:flatpickr
        on:close={() => {
          console.log("closed");
        }}
        dateFormat="d-m-Y"
      />
    </div>
  </div>

  <!-- <button type="button" on:click={handleOpen}>
      
      
    </button> -->

  <!-- <label>
      <input type="checkbox" bind:checked={multiple} />
      Multiple?
    </label> -->

  <!-- <button type="button" on:click={handleClear}> Clear </button>
    

    <button type="submit"> Submit </button> -->
</div>

<style lang="postcss">
  .ab-main-qs {
    text-align: center;
    padding: 1em;
    /* margin: 0 auto; */
  }

  @media (min-width: 768px) {
    .ab-qs-date {
      width: 33.333333%;
    }
  }

  .ab-qs-date {
    /* padding-left: 0.5rem;
    padding-right: 0.5rem; */
    padding: 0;
    margin-top: 0.375rem;
    position: relative;
    display: flex;
    min-width: 300px;
  }

  .ab-qs-date .ab-qs-input {
    display: flex;
    height: 44px;
    outline-offset: -2px;
    color: rgb(71 85 105);
    text-align: left;
    /* padding-left: 0.5rem;
    padding-right: 0.75rem; */
    padding: 0;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: rgb(203 213 225);
    border-style: solid;
    border-width: 1px;
    border-radius: 0.375rem;
    flex-grow: 1;
    width: 100%;
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    text-transform: none;
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    margin: 0;

    position: relative;
  }

  .ab-qs-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0 0.25rem;
    background-color: white;
    left: 0.375rem;
    top: -0.625rem;
    position: absolute;
    z-index: 99;
  }

  :global(.ab-qs-input .flatpickr-input) {
    display: none;
    opacity: 0;
  }

  :global(.ab-qs-input input.form-control) {
    border: none;
    padding-left: 3rem;
    flex-grow: 1;
    color: rgb(71 85 105);
    font-family: inherit;
    font-size: 100%;
    border-radius: 0.375rem;
  }

  .ab-qs-date button:focus,
  .ab-qs-date button:active {
    outline-color: #64748b;
    outline-width: 2px;
    outline-style: solid;
  }

  .ab-qs-icon {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;

    vertical-align: middle;
    margin-right: 0.375rem;
  }

  .ab-qs-icon svg {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    vertical-align: middle;
  }

  /* Todo: create component from it */

  :global(.flatpickr-day) {
    box-shadow: none;
    display: inline-block !important;
    height: 52px;
    line-height: 52px;
    max-width: 52px;
  }

  :global(.qs-price-container) {
    line-height: 34px;
  }

  :global(.qs-price-container .price) {
    bottom: 10px;
    font-size: 10px;
    line-height: 0.8;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  :global(
      .flatpickr-day.selected,
      .flatpickr-day.startRange,
      .flatpickr-day.endRange,
      .flatpickr-day.selected.inRange,
      .flatpickr-day.startRange.inRange,
      .flatpickr-day.endRange.inRange,
      .flatpickr-day.selected:focus,
      .flatpickr-day.startRange:focus,
      .flatpickr-day.endRange:focus,
      .flatpickr-day.selected:hover,
      .flatpickr-day.startRange:hover,
      .flatpickr-day.endRange:hover,
      .flatpickr-day.selected.prevMonthDay,
      .flatpickr-day.startRange.prevMonthDay,
      .flatpickr-day.endRange.prevMonthDay,
      .flatpickr-day.selected.nextMonthDay,
      .flatpickr-day.startRange.nextMonthDay,
      .flatpickr-day.endRange.nextMonthDay
    ) {
    background: #82009f;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #fff;
    border-color: #82009f;
  }

  :global(.flatpickr-day) {
    border-radius: 0.25rem;
  }

  :global(
      .flatpickr-day.selected.startRange,
      .flatpickr-day.startRange.startRange,
      .flatpickr-day.endRange.startRange
    ) {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  :global(
      .flatpickr-day.selected.endRange,
      .flatpickr-day.startRange.endRange,
      .flatpickr-day.endRange.endRange
    ) {
    border-radius: 0 0.25rem 0.25rem 0;
  }

  :global(
      .flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n + 1)),
      .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
      .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n + 1))
    ) {
    -webkit-box-shadow: -10px 0 0 #82009f00;
    box-shadow: -10px 0 0 #82009f00;
  }

  :global(.flatpick-calendar.open) {
    @apply py-1 px-2 leading-6 text-base bg-white border-gray-200 border-solid text-zinc-800;
  }
</style>
