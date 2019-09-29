<template>
  <div class="terminal-wrap common-width">
    <b-scroll>
      <div class="chars-wrap">
        <ve-pie
          :title="title1"
          :data="chartData"
          legend-position="bottom">
        </ve-pie>
        
        <ve-bar
          :colors="colors"
          :title="title2"
          :data="chartData2"
          :extend="chartExtend"
          :legend-visible="false">
        </ve-bar>
        
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
            {'type': '1年内已换机', 'count': 1393},
            {'type': '2年内已换机', 'count': 3530},
            {'type': '大于2年内已换机', 'count': 2923}
          ]
        },
        chartData2: {
          columns: ['type', '数量'],
          rows: [
            {'type': '华为', '数量': 6553},
            {'type': '小米', '数量': 3530},
            {'type': 'Apple', '数量': 2923},
            {'type': '三星', '数量': 1723},
            {'type': '魅族', '数量': 3792},
            {'type': '中兴', '数量': 4593}
          ]
        },
        chartData3: {
          columns: ['type', '数量'],
          rows: [
            {'type': '华为', '数量': 200},
            {'type': '小米', '数量': 198},
            {'type': 'Apple', '数量': 22},
            {'type': '三星', '数量': 167},
            {'type': '魅族', '数量': 56},
            {'type': '中兴', '数量': 285}
          ]
        },
        chartExtend: {
          series: {
            barWidth: 20
          }
        },
        title1: {
          show: true,
          text: '终端换季时间客户占比',
          x: 'center',
          y: 'top'
        },
        title2: {
          show: true,
          text: '终端品牌排名',
          x: 'center',
          y: 'top'
        },
        title3: {
          show: true,
          text: '终端机型排名',
          x: 'center',
          y: 'top'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .terminal-wrap {
    .chars-wrap {
      padding: 10px;
    }
  }
</style>
