<script lang="ts">
  import { onMount } from "svelte";
  import { selectorsValues } from "@utils/stores";
  import { encr, decr } from "@utils/crypto";

  import { clickOutside } from "@utils/interactive";
  export let name: string;
  export let items: any[]; /* TODO */
  export let activeItem: any; /* TODO */

  let open = false;

  function toggleMenu(e) {
    if (!open) {
      open = true;
      console.log(e);
      e.target.firstElementChild.focus();
    } else {
      open = false;
    }
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
    document.cookie = `select:${name}=${encr(i)}`;
    console.log(selectorsValues.get()[name]);
  }

  const focusFirstDropdownLink = ({ target }) => {
    // target.firstElementChild.focus();
  };
</script>

<div
  id={name + "-nav-selector"}
  class="ab-dropdown ab-nav-select"
  aria-label={activeItem}
>
  <div
    id={name + "-nav-selector-btn"}
    class="ab-dropdown-btn"
    on:click={toggleMenu}
    on:keypress={toggleMenu}
    role="button"
    aria-expanded={open}
    aria-haspopup="true"
    data-toggle="dropdown"
    aria-controls={"dropdown-menu-" + name}
    tabindex="0"
  >
    <span class="ab-dropdown-link">
      <span class="ab-name">{activeItem}</span>
    </span>
  </div>
  <ul
    id={"dropdown-menu-" + name}
    class="ab-dropdown-menu"
    class:open
    role="menu"
    on:transitionend={(e) => {
      console.log(e);
      focusFirstDropdownLink(e);
    }}
    use:clickOutside
    on:clickOutside={closeMenu}
    aria-labelledby={name + "-nav-selector-btn"}
  >
    {#each items as i}
      <li role="presentation" class={i === activeItem ? "active" : ""}>
        <button on:click={() => setItem(i)}>
          <span role="menuitem" tabindex="-1">{i}</span>
        </button>
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

  .ab-dropdown-btn {
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
    /* align-items: center;
    line-height: 32px;
    block-size: 34px; */
    box-sizing: border-box;
    margin: 3px 5px;
    /* display: flex; */
    position: relative;
    align-items: center;
    /* padding: 6px 8px; */
    /* 
    transition: background-color 0.2s ease-in-out;
    border-radius: 0.25rem; */
  }

  .ab-dropdown-menu li button {
    align-items: center;
    line-height: 32px;
    block-size: 32px;
    flex: 0 1 180px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 8px;
    border: 0;
    cursor: default;
    display: flex;
    list-style: none;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    /* outline: 0; */
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    border-radius: 0.25rem;
    color: rgb(100, 104, 108);
    font-size: 14px;
    user-select: none;
  }

  .ab-dropdown-menu li button span {
    width: 100%;
    text-align: left;
  }

  .ab-dropdown-menu li.active,
  .ab-dropdown-menu li.active button {
    background-color: hsl(0deg, 0%, 98%);
    transition: background-color 0.2s ease-in-out;
    cursor: default;
  }

  .ab-dropdown-menu li::before {
    block-size: 16px;
    border-radius: 3px;
    content: "";
    inline-size: 3px;
    inset-inline-end: 0;
    opacity: 0;
    position: absolute;
    transform: scaleY(0);
    z-index: 9;
    margin: 8px 0;

    transition-property: transform, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }

  .ab-dropdown-menu li.active::before {
    background-color: rgb(28, 126, 214);

    /* margin-right: -1.5px; */

    opacity: 1;
    transform: scaleY(1);

    /* content: "";
        background-color: rgb(28,126,214);
        block-size: 16px;
        border-radius: 3px;
        inline-size: 3px;
        inset-inline-start: 0; */

    transition-property: transform, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }

  .ab-dropdown-menu li button:hover,
  .ab-dropdown-menu li button:focus {
    background-color: hsl(0deg, 0%, 97%);
    transition: background-color 0.2s ease-in-out;
  }
</style>
