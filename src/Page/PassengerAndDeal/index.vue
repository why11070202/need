<template>
  <div class="passenger-deal-wrap common-width">
    <headers showRight/>
    <div class="passenger-deal-view-wrap">
    
      <div class="search-wrap">
        <div class="title">网格：</div>
        <div class="input-wrap">
          <input type="text" v-model="keyword" placeholder="请输入网格搜索" @keyup.enter="_getMapData">
        </div>
        <div class="search-btn-wrap" @click="_getMapData">搜 索</div>
      </div>
    
      <div class="peer-map-wrap">
        <div id="passenger-container"></div>
      </div>
  
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import BScroll from 'Element/BScroll';
  import AMap from 'AMap';
  import { getCtdCustomerTradeApi } from "../../Fetch/mapApi";
  
  let map;
  
  export default {
    components: {
      Headers,
      BScroll
    },
    data() {
      return {
        keyword: ''
      }
    },
    mounted() {
      this._getMapData();
    },
    methods: {
      _getMapData() {
        const _self = this;
        getCtdCustomerTradeApi(_self.keyword, res => {
          if (res.length) {
            let pathArr = [], heatData = [], maxArrData = [],
              center = [res[0].griddingCenterLng, res[0].griddingCenterLat];
            res.forEach(items => {
              items.rfList.forEach(item => {
                heatData.push({
                  lng: item.rfCenterLng,
                  lat: item.rfCenterLat,
                  count: item.count || 0
                });
                maxArrData.push(item.count || 0);
              });
              pathArr = [...pathArr.slice(0), ...items.griddingPath.split(';').map(item => (JSON.parse(item)))];
            });
            _self._initMap(pathArr, heatData, Math.max.apply(Math, maxArrData), center);
          } else {
            _self._initMap()
          }
        });
      },
      _initMap(paths = [], heatData = [], maxCount = 0, center = [113.209809, 23.150279]) {
        map = new AMap.Map('passenger-container', {
          center: center,
          zoom: 16
        });
        let heatmap;
        map.plugin(["AMap.Heatmap"], function () {
          heatmap = new AMap.Heatmap(map, {
            radius: 20,
            opacity: [0, 0.8]
          });
          heatmap.setDataSet({
            data: heatData,
            max: maxCount
          });
        });
        let polygon = new AMap.Polygon({
          path: paths,
          strokeColor: "#f45c5c",
          strokeWeight: 6,
          strokeOpacity: 0.8,
          fillOpacity: 0.4,
          fillColor: '',
          zIndex: 50,
        });
        map.add(polygon);
        map.setFitView([polygon]);
      }
    }
  }
</script>

<style scoped lang="less">
  .passenger-deal-wrap {
    display: flex;
    flex-direction: column;
    
    .passenger-deal-view-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: calc(100% - 45px);
      
      .search-wrap {
        height: 34px;
        padding: 2px;
        display: flex;
        
        .title, .search-btn-wrap {
          line-height: 30px;
        }
        
        .search-btn-wrap {
          line-height: 30px;
          margin-right: 2px;
          padding: 0 15px;
          border-radius: 5px;
          color: white;
          background: #2572d8;
          user-select: none;
          cursor: pointer;
        }
        
        .input-wrap {
          flex: 1;
          border: 1px solid #e8e8e8;
          border-radius: 5px;
          overflow: hidden;
          margin: 0 5px;
          
          input {
            width: 100%;
            height: 100%;
            outline: none;
            border: 0;
            padding: 5px 8px;
            font-size: 14px;
            
            &::-webkit-input-placeholder {
              font-size: 12px;
            }
          }
        }
      }
      
      .peer-map-wrap {
        flex: 1;
        
        #passenger-container {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
