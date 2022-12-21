export {};
declare global {
  interface Window {
    route: (event: Event | undefined) => void;
  }
}
