// Use className with dot or not?
export const clickOutsideHandler = (event: MouseEvent, className: string, handler: () => void) => {
  if( !((event.target as HTMLElement).closest('.' + className)) ) {
    handler && handler();
  }
}