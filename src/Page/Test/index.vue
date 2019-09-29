<template>
  <div class="v-test-wrap common-width">
    <ve-pie :title="title" :data="chartData" legend-position="bottom"></ve-pie>
  
    <ve-line :data="chartData"></ve-line>
  
    <ve-bar :data="chartData2" :legend-visible="false"></ve-bar>
    
  </div>
</template>

<script type="text/ecmascript-6">
  
  export default {
    components: {
    
    },
    data() {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        },
        chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        title: {
          show: true,
          text: '这是图表的标题',
          x: 'center',
          y: 'top'
        }
      }
    },
    computed: {
    
    },
    mounted() {
    
    },
    methods: {
    
    }
  }
</script>

<style lang="less">
  .v-test-wrap {
    overflow: auto;
  }
</style>
