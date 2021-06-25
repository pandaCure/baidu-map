<template>
  <div ref="view" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface IMap {
  map: {
    addOverlay(point: any): void;
    openInfoWindow(window: any, point: any): void;
  };
}
interface IWindowOptions {
  opts: {
    width: number;
    height: number;
    title: string;
    message: string;
    [key: string]: any;
  },
  positionName: string;
}
export default defineComponent({
  name: "baidu-map",
  data() {
    return { map: {} } as IMap;
  },
  methods: {
    initScript(): Promise<any> {
      if (!window.BMap) {
        const ak = this.ak;
        window.BMap = {};
        window.BMap._preloader = new Promise((resolve, reject) => {
          window._initBaiduMap = function () {
            resolve(window.BMap);
            window.document.body.removeChild($script);
            window.BMap._preloader = null;
            window._initBaiduMap = null;
          };
          const $script = document.createElement("script");
          window.document.body.appendChild($script);
          $script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`;
        });
        return window.BMap._preloader;
      } else if (!window.BMap._preloader) {
        return Promise.resolve(window.BMap);
      } else {
        return window.BMap._preloader;
      }
    },
    initMap(BMap: any) {
      const $el = this.$refs.view;
      const map = new BMap.Map($el);
      this.map = map;
      map.reset();
      map.centerAndZoom(this.getCenterPoint(this.center), 12);
    },
    getCenterPoint(center: any) {
      if (center) {
        return new window.BMap.Point(center.lng, center.lat);
      } else {
        console.error("请传入经纬度");
      }
    },
    setMapMarker() {
      const { BMap } = window;
      const point = this.getCenterPoint(this.markerPoint);
      const marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      var opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: "故宫博物院", // 信息窗口标题
        message: "这里是故宫",
      };
      var infoWindow = new BMap.InfoWindow(
        "地址：北京市东城区王府井大街88号乐天银泰百货八层",
        opts
      ); // 创建信息窗口对象
      marker.addEventListener("click", () => {
        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    },
  },
  props: {
    // 账号AK
    ak: {
      type: String,
      required: true,
    },
    // 地图中心点
    center: {
      type: Object,
      required: true,
    },
    markerPoint: {
      type: Object,
      required: true,
    },
    windowOptions: {
      type: Object as IWindowOptions,
      required: true,
    }
  },
  mounted() {
    this.initScript().then(this.initMap);
  },
});
</script>
<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
div {
  width: 100%;
  height: 100%;
}
</style>
