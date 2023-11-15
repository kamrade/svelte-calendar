<script lang='ts'>
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { clickOutsideHandler } from '$lib/utils';

  export let showDropdown = false;
  export let hideDropdown: () => void;
  export let clickOutside = true;
  export let uniqID: string;

  onMount(() => {
    if (clickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    document.addEventListener('keydown', handleTabKey);
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleTabKey);
    }
  });

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      hideDropdown();
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    clickOutsideHandler(event, uniqID, () => hideDropdown());
  }

</script>

<div class={`Dropdown ${showDropdown ? 'visible' : 'hidden'}`} id={uniqID}>
  <slot name='DropdownContent'></slot>
</div>

<style lang='scss'>

  .Dropdown {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border-radius: 6px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.12);
    background: white;

    &.hidden {
      display: none;
    }

    &.visible {
      display: block;
    }
  }

</style>
