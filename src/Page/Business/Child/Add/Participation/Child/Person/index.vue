<template>
  <div class="person-wrap common-width">
  
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
  import { numberComma } from "Common/Js";
  import { getAddPathFromCapacityPersonApi } from "../../../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      return {
        tBody: [],
        columns: [
          {
            "title": "一线经理",
            "key": "name",
            "fixed": "",
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
            "title": "渠道总数",
            "key": "trenchAmount",
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
                numberComma(params.row.trenchAmount)
              )
            }
          },
          {
            "title": "零产能渠道数",
            "key": "zeroCapacityTrenchAmount",
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
                numberComma(params.row.zeroCapacityTrenchAmount)
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
                numberComma(params.row.proportion)
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
                numberComma(params.row.monthChainRelativeRatio)
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getAddPathFromCapacityPersonApi({
        branch: _self.$route.params.district,
        gridding: _self.$route.params.street.replace(/@/g, '#').replace(/-/g, '/')
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          name: '合计',
          trenchAmount: res.statistics.trenchAmount,
          zeroCapacityTrenchAmount: res.statistics.zeroCapacityTrenchAmount,
          proportion: res.statistics.proportion,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio
        }];
        _self.columns[0].fixed = 'left';
      });
    }
  }
</script>

<style scoped lang="less">
  .person-wrap {
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
