<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import flatpickr from "flatpickr";
  import { French } from "flatpickr/dist/l10n/fr";
  import type FlatpickrFn from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";

  const hooks = new Set([
    "onChange",
    "onOpen",
    "onClose",
    "onMonthChange",
    "onYearChange",
    "onReady",
    "onValueUpdate",
    "onDayCreate",
  ]);

  type FPElement = {
    wrap: Boolean;
  };

  export let value = "",
    formattedValue = "",
    element: FPElement | null = null,
    dateFormat: string | Date | undefined;

  export let options = {};

  let ready = false;

  export let input = undefined,
    fp: FlatpickrFn.Instance | undefined;
  export { fp as flatpickr };

  $: if (fp && ready) {
    // fp.setDate(value, false, dateFormat);
  }

  onMount(() => {
    const elem = element || input;

    const opts = addHooks(options);
    opts.onReady.push(() => {
      ready = true;
    });

    fp = flatpickr(elem, Object.assign(opts, element ? { wrap: true } : {}));

    return () => {
      fp.destroy();
    };
  });

  const dispatch = createEventDispatcher();

  $: if (fp && ready) {
    for (const [key, val] of Object.entries(addHooks(options))) {
      fp.set(key, val);
    }
  }

  function addHooks(opts = {}) {
    opts = Object.assign({}, opts);

    for (const hook of hooks) {
      const firer = (
        selectedDates: [Date],
        dateStr: string,
        instance: FlatpickrFn.Instance
      ) => {
        dispatch(stripOn(hook), [selectedDates, dateStr, instance]);
      };

      if (hook in opts) {
        // Hooks must be arrays
        if (!Array.isArray(opts[hook])) opts[hook] = [opts[hook]];

        opts[hook].push(firer);
      } else {
        opts[hook] = [firer];
      }
    }

    if (opts.onChange && !opts.onChange.includes(updateValue))
      opts.onChange.push(updateValue);

    return opts;
  }

  function updateValue(newValue, dateStr, fp) {
    const mode = fp?.config?.mode ?? "single";

    value = mode === "single" ? newValue[0] : newValue;
    formattedValue = dateStr;
  }

  function stripOn(hook) {
    return hook.charAt(2).toLowerCase() + hook.substring(3);
  }
</script>

<input
  bind:this={input}
  {...$$restProps}
  placeholder="Select Date.."
  data-input
/>

<style>
  input {
    display: none;
  }
  input.form-control {
    display: block;
  }
</style>
