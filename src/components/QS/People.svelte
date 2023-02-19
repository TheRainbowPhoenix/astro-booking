<script lang="ts">
</script>

<div class="ab-main-people">
  <div class="ab-people-date">
    <label class="ab-people-label" for="ab-people-input">
      <span aria-hidden="true">Pick Peoples</span>
    </label>
    <div id="ab-people-input" class="ab-people-input">
      <span class="ab-people-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
          class="w-6 h-6"
          viewBox="0 0 16 16"
          ><path
            fill="currentColor"
            d="M4 5.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM5.5 3a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Zm5 3a1 1 0 1 1 2 0a1 1 0 0 1-2 0Zm1-2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm-10 6.5A1.5 1.5 0 0 1 3 9h5a1.5 1.5 0 0 1 1.5 1.5v.112a1.38 1.38 0 0 1-.01.137a2.853 2.853 0 0 1-.524 1.342C8.419 12.846 7.379 13.5 5.5 13.5c-1.878 0-2.918-.654-3.467-1.409a2.853 2.853 0 0 1-.523-1.342a1.906 1.906 0 0 1-.01-.137V10.5Zm1 .09v.007l.004.049a1.853 1.853 0 0 0 .338.857c.326.448 1.036.997 2.658.997c1.622 0 2.332-.549 2.658-.997a1.853 1.853 0 0 0 .338-.857a.912.912 0 0 0 .004-.05V10.5A.5.5 0 0 0 8 10H3a.5.5 0 0 0-.5.5v.09Zm9 1.91c-.588 0-1.07-.09-1.46-.238a3.85 3.85 0 0 0 .361-.932c.268.101.624.17 1.099.17c1.119 0 1.578-.382 1.78-.666a1.224 1.224 0 0 0 .218-.56l.002-.028a.25.25 0 0 0-.25-.246h-2.8A2.49 2.49 0 0 0 10 9h3.25c.69 0 1.25.56 1.25 1.25v.017a1.352 1.352 0 0 1-.008.109a2.225 2.225 0 0 1-.398 1.04c-.422.591-1.213 1.084-2.594 1.084Z"
          /></svg
        >
      </span>
      <input type="number" value="2" />
    </div>
  </div>
</div>

<style>
  .ab-main-people {
    text-align: center;
    padding: 1em;
    /* margin: 0 auto; */
    min-width: 150px;
  }

  @media (min-width: 768px) {
    .ab-people-date {
      /* width: 20%; */
    }
  }

  .ab-people-date {
    /* padding-left: 0.5rem;
    padding-right: 0.5rem; */
    padding: 0;
    margin-top: 0.375rem;
    position: relative;
    display: flex;
  }

  .ab-people-date .ab-people-input {
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

  .ab-people-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0 0.25rem;
    background-color: white;
    left: 0.375rem;
    top: -0.625rem;
    position: absolute;
    z-index: 9;
  }

  .ab-people-input input {
    border: none;
    padding-left: 3rem;
    flex-grow: 1;
    color: rgb(71 85 105);
    font-family: inherit;
    font-size: 100%;
    border-radius: 0.375rem;
  }

  .ab-people-date input:focus,
  .ab-people-date input:active {
    outline-color: #64748b;
    outline-width: 2px;
    outline-style: solid;
  }

  .ab-people-icon {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;

    vertical-align: middle;
    margin-right: 0.375rem;
  }

  .ab-people-icon svg {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    vertical-align: middle;
  }
</style>
