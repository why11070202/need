<template>
  <div class="add-person-wrap common-width">
  
    <div class="update-wrap" v-if="updateText !== ''" v-text="updateText"></div>
  
    <div class="content-wrap">
      <div class="new-table-list-wrap">
        <new-table :columns="columns" :data="tBody"/>
      </div>
    </div>
    
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import NewTable from 'Element/NewTable';
  import { numberComma } from "Common/Js";
  import { getAddBoardFromPersonApi } from '../../../../../../Fetch/port';
  
  export default {
    components: {
      NewTable
    },
    data() {
      const _self = this;
      let { role, gridding } = JSON.parse(localStorage.getItem('role'));
      let account = localStorage.getItem('name');
      return {
        tBody: [],
        columns: [
          {
            "title": "一线经理",
            "key": "name",
            "fixed": "",
            "width": 80,
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
                  attrs: {
                    class: role === 1 ? 'can-click' : role === 3 ? params.row.account === account ? 'can-click' : '' : ''
                  },
                  on: {
                    click: () => {
                      if (role === 1 || role === 2 || (role === 3 && params.row.account === account)) {
                        _self._trClick(params.row);
                      }
                    }
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
                params.row.goal ? params.row.goal.toFixed(3) : '-'
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
                    class: `lamp lamp-${params.row.timeProgressType}`
                  }
                },
                numberComma(params.row.timeProgress)
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
      getAddBoardFromPersonApi({
        branch: _self.$route.params.district,
        gridding: _self.$route.params.street
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
    },
    methods: {
      _headClick () {
        let { district, street } = this.$route.params;
        this.$router.push(`/menu/business/add/time/street/${district}/person/${street}`);
      },
      _trClick(obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/ditch/${obj.account}`);
      }
    }
  }
</script>

<style scoped lang="less">
  .add-person-wrap {
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
