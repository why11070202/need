<template>
  <div class="add-ditch-wrap common-width">
  
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
  import { getAddBoardFromDitchlApi } from "../../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      const _self = this;
      return {
        tBody: [],
        columns: [
          {
            "title": "渠道名称",
            "key": "name",
            "fixed": "",
            "width": 150,
            "align": "center",
            render: (h, params) => {
              if (params.row.isFooter) {
                return h(
                  'div',
                  {
                    attrs: {
                      class: 'table-total'
                    }
                  },
                  params.row.name
                )
              }
              return h(
                'div',
                {
                  style: {
                    'text-align': 'left'
                  }
                },
                params.row.name
              )
            }
          },
          {
            "title": "目标值",
            "key": "goal",
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
                numberComma(params.row.goal)
              )
            }
          },
          {
            "title": "完成值",
            "key": "complete",
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
                numberComma(params.row.complete)
              )
            }
          },
          {
            "title": "完成率%",
            "key": "percentageComplete",
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
                numberComma(params.row.percentageComplete)
              )
            }
          },
          {
            "title": "时间进度%",
            "key": "timeProgress",
            "width": 90,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {
                  attrs: {
                    class: params.row.timeProgress ? `lamp lamp-${params.row.timeProgressType}` : ''
                  }
                },
                numberComma(params.row.timeProgress)
              )
            }
          },
          {
            "title": "月环比",
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
          },
          {
            "title": "排名",
            "key": "ranking",
            "width": 35,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : {},
                params.row.ranking
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getAddBoardFromDitchlApi({
        branch: _self.$route.params.district,
        gridding: _self.$route.params.street,
        managerAccount: _self.$route.params.managerAccount
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          name: '合计',
          goal: res.statistics.goal,
          complete: res.statistics.complete,
          percentageComplete: res.statistics.percentageComplete,
          timeProgress: res.statistics.timeProgress,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio,
          ranking: '-',
        }];
        _self.columns[0].fixed = 'left';
      })
    }
  }
</script>

<style scoped lang="less">
  .add-ditch-wrap {
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
