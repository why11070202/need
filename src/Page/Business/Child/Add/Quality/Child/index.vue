<template>
  <div class="quality-detail-wrap common-width">
    
    <div class="update-wrap" v-if="updateText !== ''" v-text="updateText"></div>
  
    <div class="content-wrap">
      <div class="new-table-list-wrap">
        <new-table :columns="columns" :data="tBody"/>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import NewTable from 'Element/NewTable';
  import { getAddQualityApi } from "../../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      return {
        tBody: [],
        columns: [
          {
            "title": "类别",
            "key": "indicatorItem",
            "fixed": "left",
            "width": 90,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.indicatorItem
              )
            }
          },
          {
            "title": "一线经理",
            "key": "name",
            "width": 90,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.name
              )
            }
          },
          {
            "title": "月新增",
            "key": "monthNewIncremental",
            "width": 80,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.monthNewIncremental ? params.row.monthNewIncremental.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "占比%",
            "key": "proportion",
            "width": 60,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.proportion ? params.row.proportion.toFixed(3) : '-'
              )
            }
          },
          {
            "title": "月环比%",
            "key": "monthChainRelativeRatio",
            "width": 80,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.monthChainRelativeRatio ? params.row.monthChainRelativeRatio.toFixed(3) : '-'
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      let { district, street, person, type } = _self.$route.params;
      getAddQualityApi({
        branch: district,
        gridding: street,
        managerAccount: person,
        type
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          indicatorItem: '合计',
          name: res.data[0].name || '-',
          monthNewIncremental: res.statistics.monthNewIncremental,
          proportion: res.statistics.proportion,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio
        }];
      })
    }
  }
</script>

<style scoped lang="less">
  .quality-detail-wrap {
    display: flex;
    flex-direction: column;
    
    .update-wrap {
      padding: 0 10px 5px;
      text-align: right;
    }
    .content-wrap {
      flex: 1;
    }
  }
</style>
