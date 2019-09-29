<template>
  <div class="combo-wrap common-width">
    <b-scroll>
      <div class="chars-wrap">
        <ve-pie
          :title="title1"
          :data="chartData"
          legend-position="bottom">
        </ve-pie>
  
        <ve-pie
          :title="title2"
          :data="chartData2"
          legend-position="bottom">
        </ve-pie>
      
        <ve-bar
          :title="title3"
          :data="chartData3"
          :extend="chartExtend"
          :legend-visible="false">
        </ve-bar>
    
      </div>
    </b-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';
  
  export default {
    components: {
      BScroll
    },
    data() {
      return {
        colors: ['#31c6ee'],
        chartData: {
          columns: ['type', 'count'],
          rows: [
            {'type': '主套不限量套餐', 'count': 1393},
            {'type': '叠加性不限量', 'count': 3530},
            {'type': '家庭网', 'count': 2000},
            {'type': '家庭宽带', 'count': 2923}
          ]
        },
        chartData2: {
          columns: ['type', 'count'],
          rows: [
            {'type': '88+套餐', 'count': 4553},
            {'type': '88-套餐', 'count': 3530}
          ]
        },
        chartData3: {
          columns: ['type', 'count'],
          rows: [
            {'type': '华为', 'count': 100},
            {'type': '小米', 'count': 90},
            {'type': 'Apple', 'count': 68}
          ]
        },
        chartExtend: {
          series: {
            barWidth: 20
          }
        },
        title1: {
          show: true,
          text: '主要产品渗透率',
          x: 'center',
          y: 'top'
        },
        title2: {
          show: true,
          text: '客户套餐占比',
          x: 'center',
          y: 'top'
        },
        title3: {
          show: true,
          text: '视频门户APP使用偏好排名',
          x: 'center',
          y: 'top'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .combo-wrap {
    .chars-wrap {
      padding: 10px;
    }
  }
</style>
