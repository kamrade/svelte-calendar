<script lang='ts'>
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { clickOutsideHandler } from './utils/click-outside-handler';

  export let showDropdown = false;
  export let hideDropdown: () => void;
  export let clickOutside = true;

  onMount(() => {
    if (clickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  const handleClickOutside = (event: MouseEvent) => {
    clickOutsideHandler(event, 'Dropdown', () => hideDropdown());
  }

</script>

<div class={`Dropdown ${showDropdown ? 'visible' : 'hidden'}`} >
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
