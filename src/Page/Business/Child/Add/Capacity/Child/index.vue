<template>
  <div class="capacity-detail-wrap common-width">
  
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
  import { getDitchCapacityApi } from "../../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      return {
        tBody: [],
        columns: [
          {
            title: '渠道类型',
            key: 'trenchType',
            fixed: 'left',
            width: 90,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.trenchType
              )
            }
          },
          {
            title: '一线经理',
            key: 'name',
            width: 90,
            align: 'center',
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
            title: '月新增',
            key: 'monthNewIncremental',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.monthNewIncremental)
              )
            }
          },
          {
            title: '渠道新增',
            key: 'trenchNewIncremental',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                numberComma(params.row.trenchNewIncremental)
              )
            }
          },
          {
            title: '占比%',
            key: 'proportion',
            width: 80,
            align: 'center',
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
            title: '月环比%',
            key: 'monthChainRelativeRatio',
            width: 80,
            align: 'center',
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
      let { district, street, person, type } = _self.$route.params;
      getDitchCapacityApi({
        branch: district,
        gridding: street,
        managerAccount: person,
        type
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          trenchType: '合计',
          name: res.data[0].name || '-',
          monthNewIncremental: res.statistics.monthNewIncremental,
          trenchNewIncremental: res.statistics.trenchNewIncremental,
          proportion: res.statistics.proportion,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio
        }];
      })
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="less">
  .capacity-detail-wrap {
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
