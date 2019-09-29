<template>
  <div class="home-address-wrap common-width">
  
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
  import { getHomeBoardFromAddressApi } from "../../../../../../Fetch/port";

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
            "title": "五级地址",
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
            "title": "新增",
            "key": "newIncremental",
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
                numberComma(params.row.newIncremental)
              )
            }
          },
          {
            "title": "流失",
            "key": "currentMonthLeave",
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
                numberComma(params.row.currentMonthLeave)
              )
            }
          },
          {
            "title": "净增",
            "key": "netGrowth",
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
                numberComma(params.row.netGrowth)
              )
            }
          },
          {
            "title": "环比%",
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
            "title": "时间进度",
            "key": "timeProgress",
            "width": 90,
            "align": "center",
            renderHeader: (h, params) => {
              return h(
                'div',
                {
                  attrs: {
                    class: _self.tBody.length ? 'can-click' : ''
                  },
                  on: {
                    click: () => {
                      if (_self.tBody.length) {
                        _self._headClick();
                      }
                    }
                  }
                },
                params.column.title
              )
            },
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
            "title": "预估得分",
            "key": "forecastScore",
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
                numberComma(params.row.forecastScore)
              )
            }
          }
        ],
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getHomeBoardFromAddressApi({
        branch: _self.$route.params.district,
        gridding: _self.$route.params.street,
        managerAccount: _self.$route.params.account
      }, res => {
        _self.updateText = res.description;
        _self.tBody = [...res.data, {
          isFooter: true,
          name: '合计',
          goal: res.statistics.goal,
          newIncremental: res.statistics.newIncremental,
          currentMonthLeave: res.statistics.currentMonthLeave,
          netGrowth: res.statistics.netGrowth,
          monthChainRelativeRatio: res.statistics.monthChainRelativeRatio,
          percentageComplete: res.statistics.percentageComplete,
          timeProgress: res.statistics.timeProgress,
          forecastScore: 0
        }];
        _self.columns[0].fixed = 'left';
      })
    },
    methods: {
      _headClick () {
        let { district, street } = this.$route.params;
        this.$router.push(`/menu/business/home/time/street/${district}/person/${street}`);
      }
    }
  }
</script>

<style scoped lang="less">
  .home-address-wrap {
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
