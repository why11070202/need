<template>
  <div class="improving-path-wrap common-width">
    <div class="improving-search-wrap">
      <div class="search-wrap">
        <div class="search-items-wrap">
          <div class="search-items">
            <span class="items-title">分公司：</span>
            <div class="select-wrap">
              <select v-model="branch" @change="_changeA" :disabled="selectBolA">
                <option value="">请选择</option>
                <option v-for="(items, index) in a" :value="items.name" :key="index">{{items.name}}</option>
              </select>
            </div>
          </div>
          <div class="search-items">
            <span class="items-title">网格：</span>
            <div class="select-wrap">
              <select v-model="gridding" @change="_changeB" :disabled="selectBolB">
                <option value="">请选择</option>
                <option v-for="(items, index) in b" :value="items.name" :key="index">{{items.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="search-items-wrap">
          <div class="search-items">
            <span class="items-title">一线经理：</span>
            <div class="select-wrap">
              <select v-model="managerAccount" @change="_getListFn">
                <option value="">请选择</option>
                <option v-for="(items, index) in c" :value="items.account" :key="index">{{items.name}}</option>
              </select>
            </div>
          </div>
          <div class="search-items">
            <span class="items-title">类型：</span>
            <div class="select-wrap">
              <select  v-model="type" @change="_changeType">
                <option v-for="(items, index) in d" :value="items.value" :key="index">{{items.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="update-wrap" v-if="updateText !== ''" v-text="updateText"></div>
    
    <div class="content-list-view-wrap">
      <div class="new-table-list-wrap">
        <new-table :columns="columns" :data="tBody"/>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import NewTable from 'Element/NewTable';
  import { numberComma } from "Common/Js";
  import { getHomePathOrganizationApi, getHomePathType } from "../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      return {
        a: [],
        b: [],
        c: [],
        d: [
          {
            name: '家宽净增',
            value: '0',
            tHead: [
              {
                title: "维度",
                key: "name",
                fixed: "left",
                width: 90,
                align: "center"
              },
              {
                title: "家庭净增",
                key: "marketSegment",
                width: 100,
                align: "center"
              },
              {
                title: "当月新增",
                key: "newIncremental",
                width: 80,
                align: "center",
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
                title: "当月流失",
                key: "currentMonthLeave",
                width: 80,
                align: "center",
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
                title: "当月净增",
                key: "netGrowth",
                width: 80,
                align: "center",
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
                title: "环比上月%",
                key: "monthChainRelativeRatio",
                width: 80,
                align: "center",
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
            ]
          },
          {
            name: '社渠家宽新增',
            value: '1',
            tHead: [
              {
                title: "维度",
                key: "name",
                fixed: "left",
                width: 90,
                align: "center"
              },
              {
                title: "社渠家宽新增",
                key: "trenchType",
                width: 90,
                align: "center"
              },
              {
                title: "当月新增",
                key: "currentMonthNewIncremental",
                width: 80,
                align: "center",
                render: (h, params) => {
                  return h(
                    'div',
                    params.row.isFooter ? {
                      attrs: {
                        class: 'table-total'
                      }
                    } : {},
                    numberComma(params.row.currentMonthNewIncremental)
                  )
                }
              },
              {
                title: "环比上月%",
                key: "monthChainRelativeRatio",
                width: 80,
                align: "center",
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
                title: "完成率%",
                key: "percentageComplete",
                width: 80,
                align: "center",
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
                title: "时间进度",
                key: "timeProgress",
                width: 90,
                align: "center",
                render: (h, params) => {
                  return h(
                    'div',
                    params.row.isFooter ? {
                      attrs: {
                        class: 'table-total'
                      }
                    } : {},
                    numberComma(params.row.timeProgress)
                  )
                }
              },
              {
                title: "预估得分",
                key: "forecastScore",
                width: 60,
                align: "center",
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
            ]
          },
          {
            name: '线下日均2480进度',
            value: '2',
            tHead: [
              {
                title: "维度",
                key: "name",
                fixed: "left",
                width: 90,
                align: "center"
              },
              {
                title: "线下日均2480进度",
                key: "trenchType",
                width: 115,
                align: "center"
              },
              {
                title: "当日完成量",
                key: "currentDayNewIncremental",
                width: 80,
                align: "center",
                render: (h, params) => {
                  return h(
                    'div',
                    params.row.isFooter ? {
                      attrs: {
                        class: 'table-total'
                      }
                    } : {},
                    numberComma(params.row.currentDayNewIncremental)
                  )
                }
              },
              {
                title: "当日完成率%",
                key: "percentageComplete",
                width: 100,
                align: "center",
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
                title: "当月完成量",
                key: "currentMonthNewIncremental",
                width: 90,
                align: "center",
                render: (h, params) => {
                  return h(
                    'div',
                    params.row.isFooter ? {
                      attrs: {
                        class: 'table-total'
                      }
                    } : {},
                    numberComma(params.row.currentMonthNewIncremental)
                  )
                }
              },
              {
                title: "当月完成率%",
                key: "currentMonthPercentageComplete",
                width: 100,
                align: "center",
                render: (h, params) => {
                  return h(
                    'div',
                    params.row.isFooter ? {
                      attrs: {
                        class: 'table-total'
                      }
                    } : {},
                    numberComma(params.row.currentMonthPercentageComplete)
                  )
                }
              }
            ]
          }
        ],
        branch: '',
        gridding: '',
        managerAccount: '',
        type: '0',
        columns: [],
        tBody: [],
        selectBolA: false,
        selectBolB: false,
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      _self._changeType();
      getHomePathOrganizationApi(res => {
        _self.a = res;
        let { role, branch, gridding } =JSON.parse(localStorage.getItem('role'));
        switch (role) {
          case 1:
            _self._getListFn();
            break;
          case 2:
            _self.branch = branch;
            _self.selectBolA = true;
            _self._changeA();
            _self._getListFn();
            break;
          case 3:
            _self.branch = branch;
            _self.gridding = gridding;
            _self.selectBolA = true;
            _self.selectBolB = true;
            _self._changeA();
            _self._changeB();
            _self._getListFn();
            break;
        }
      })
    },
    methods: {
      _changeA () {
        const _self = this;
        _self.a.forEach(items => {
          if (items.name === _self.branch) {
            _self.b = items.griddings;
          }
        });
        let { role } =JSON.parse(localStorage.getItem('role'));
        if (role === 1) {
          _self.gridding = '';
          _self.managerAccount = '';
        }
        _self._getListFn();
      },
      _changeB () {
        const _self = this;
        _self.managerAccount = '';
        _self.b.forEach(items => {
          if (items.name === _self.gridding) {
            _self.c = items.managers;
          }
        });
        _self._getListFn();
      },
      _changeType () {
        const _self = this;
        _self.columns = [];
        _self.d.forEach(items => {
          if (items.value === _self.type) {
            _self.columns = items.tHead;
          }
        });
        _self._getListFn();
      },
      _getListFn () {
        const _self = this;
        getHomePathType(_self.type, {
          branch: _self.branch,
          gridding: _self.gridding,
          managerAccount: _self.managerAccount
        }, res => {
          _self.updateText = res.description;
          let haveArr = [];
          res.data.forEach(items => {
            haveArr.indexOf(items.name) < 0 ? haveArr.push(items.name) : items.name = '';
          });
          _self.tBody = res.data;
        })
      },
      _setListFn (arr) {
        this.tBody = [];
        switch (this.type) {
          case '0':
            this.tBody = [...arr.map(items => {
              let obj = {
                name: items.name,
                text: [
                  items.name,
                  items.marketSegment,
                  items.newIncremental,
                  items.currentMonthLeave,
                  items.netGrowth,
                  items.monthChainRelativeRatio
                ]
              };
              return obj;
            })];
            break;
          case '1':
            this.tBody = [...arr.map(items => {
              let obj = {
                name: items.name,
                text: [
                  items.name,
                  items.trenchType,
                  items.monthChainRelativeRatio,
                  items.percentageComplete,
                  items.timeProgress,
                  items.forecastScore
                ]
              };
              return obj;
            })];
            break;
          case '2':
            this.tBody = [...arr.map(items => {
              let obj = {
                name: items.name,
                text: [
                  items.name,
                  items.trenchType,
                  items.currentDayNewIncremental,
                  items.percentageComplete,
                  items.currentMonthNewIncremental,
                  items.currentMonthPercentageComplete
                ]
              };
              return obj;
            })];
            break;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../../Common/Less/index";
  
  .improving-path-wrap {
    display: flex;
    flex-direction: column;
    
    .improving-search-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      
      .search-wrap {
        flex: 1;
        
        .search-items-wrap {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          
          .search-items {
            flex: 1;
            display: flex;
            
            span {
              width: 60px;
              line-height: 35px;
              text-align: right;
            }
            
            .select-wrap {
              flex: 1;
              
              select {
                width: 100%;
                height: 35px;
                border: 1px solid #e8e8e8;
                outline: none;
                padding-left: 5px;
              }
            }
          }
        }
      }
      
      .btn-wrap {
        flex: 0 0 70px;
        width: 70px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        text-align: center;
        background: #4285dc;
        color: white;
        user-select: none;
        cursor: pointer;
      }
    }
  
    .update-wrap {
      padding: 5px 10px;
      text-align: right;
    }
    
    .content-list-view-wrap {
      flex: 1;
    }
    
  }
</style>
