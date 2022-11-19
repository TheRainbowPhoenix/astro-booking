<script lang="ts">
  import { onMount } from "svelte";
  import { selectorsValues } from "@utils/stores";

  import { clickOutside } from "@utils/interactive";
  export let name: string;
  export let items: any[]; /* TODO */
  export let activeItem: any; /* TODO */

  let open = false;

  function toggleMenu(e) {
    open = !open;
  }

  function closeMenu(e) {
    open = false;
  }

  onMount(() => {
    let curr = selectorsValues.get()[name];
    if (curr && activeItem != curr) {
      activeItem = curr;
    }
  });

  selectorsValues.listen((value, changed) => {
    if (changed == name) {
      activeItem = value[changed];
      console.log(`${changed} new value ${value[changed]}`);
    }
  });

  function setItem(i) {
    console.log(i);
    selectorsValues.setKey(name, i);
    console.log(selectorsValues.get()[name]);
  }
</script>

<div
  id={name + "-nav-selector"}
  class="ab-dropdown ab-nav-select"
  aria-label={activeItem}
>
  <div
    class="ab-input-field ab-dropdown-label"
    on:click={toggleMenu}
    on:keypress={toggleMenu}
  >
    <span
      class="ab-dropdown-link"
      aria-haspopup="listbox"
      aria-controls={"dropdown-menu-" + name}
      role="button"
      tabindex="0"
    >
      <span class="ab-name">{activeItem} </span>
    </span>
  </div>
  <ul
    id={"dropdown-menu-" + name}
    class="ab-dropdown-menu"
    class:open
    role="menu"
    use:clickOutside
    on:clickOutside={closeMenu}
  >
    {#each items as i}
      <li
        role="presentation"
        class={i === activeItem ? "active" : ""}
        on:click={() => setItem(i)}
      >
        <span role="menuitem" tabindex="-1">{i}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .ab-dropdown {
    display: inline-block;
    position: relative;
    color: rgb(100, 104, 108);
    font-size: 16px;
    user-select: none;
  }

  .ab-dropdown-link {
    cursor: pointer;
  }

  .ab-dropdown-link .ab-name {
    font-size: 1.125rem;
    padding-right: 0.5rem;
  }

  .ab-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;

    float: left;
    min-width: 200px;
    padding: 6px 0;
    margin: 0.5rem 0;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 1rem 0 rgba(0, 0, 0, 10%);

    transform: scaleY(0);
    opacity: 0;
    display: none;

    transition-property: transform, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }

  .ab-dropdown-menu.open {
    transform: scaleY(1);
    opacity: 1;
    display: block;

    transition-property: transform, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }

  .ab-dropdown-menu li {
    align-items: center;
    line-height: 32px;
    block-size: 34px;
    box-sizing: border-box;
    margin: 3px 5px;
    padding: 6px 8px;
    cursor: default;
    display: flex;
    list-style: none;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    outline: 0;
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    border-radius: 0.25rem;
  }

  .ab-dropdown-menu li.active {
    background-color: hsl(0deg, 0%, 98%);
    transition: background-color 0.2s ease-in-out;
    cursor: default;
  }

  .ab-dropdown-menu li.active::before {
    background-color: rgb(28, 126, 214);

    block-size: 16px;
    border-radius: 3px;
    content: "";
    inline-size: 3px;
    inset-inline-end: 0;
    opacity: 0;
    position: absolute;
    transform: scaleY(0);

    opacity: 1;
    transform: scaleY(1);

    /* content: "";
        background-color: rgb(28,126,214);
        block-size: 16px;
        border-radius: 3px;
        inline-size: 3px;
        inset-inline-start: 0; */
  }

  .ab-dropdown-menu li:hover,
  .ab-dropdown-menu li:focus {
    background-color: hsl(0deg, 0%, 97%);
    transition: background-color 0.2s ease-in-out;
  }
</style>
