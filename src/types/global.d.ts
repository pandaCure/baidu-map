export {};

declare global {
  interface Window {
    BMap: any;
    _initBaiduMap: Function | null;
  }
}
declare function BMap(): void;
