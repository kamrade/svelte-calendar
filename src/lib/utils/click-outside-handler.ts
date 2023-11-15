// Use className with dot or not?
export const clickOutsideHandler = (event: MouseEvent, id: string, handler: () => void) => {
  if( !((event.target as HTMLElement).closest('#' + id)) ) {
    handler && handler();
  }
}