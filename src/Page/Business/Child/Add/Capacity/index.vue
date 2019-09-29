<template>
  <div class="capacity-wrap common-width">
    <div class="capacity-search-wrap">
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
              <select v-model="managerAccount" @change="_changeC">
                <option value="">请选择</option>
                <option v-for="(items, index) in c" :value="items.account" :key="index">{{items.name}}</option>
              </select>
            </div>
          </div>
          <div class="search-items">
            <span class="items-title">类型：</span>
            <div class="select-wrap">
              <select v-model="type" @change="_getListFn">
                <option value="">请选择</option>
                <option v-for="(items, index) in d" :value="items" :key="index">{{items}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="update-wrap" v-if="updateText !== ''" v-text="updateText"></div>
    
    <div class="capacity-view-wrap">
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
  import { getDitchCapacityApi, getDitchOrganizationApi } from "../../../../../Fetch/port";
  
  export default {
    components: {
      NewTable
    },
    data() {
      const _self = this;
      return {
        a: [],
        b: [],
        c: [],
        d: [],
        hasNext: false,
        branch: '',
        gridding: '',
        managerAccount: '',
        type: '',
        tBody: [],
        columns: [
          {
            "title": "维度",
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
            "title": "渠道类型",
            "key": "trenchType",
            "width": 90,
            "align": "center",
            render: (h, params) => {
              return h(
                'div',
                params.row.isFooter ? {
                  attrs: {
                    class: 'table-total'
                  }
                } : _self.hasNext ? {
                  attrs: {
                    class: 'can-click'
                  },
                  on: {
                    click: () => {
                      _self._toDetail(params.row.trenchType);
                    }
                  }
                } : {},
                params.row.trenchType
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
                numberComma(params.row.monthNewIncremental)
              )
            }
          },
          {
            "title": "渠道新增",
            "key": "trenchNewIncremental",
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
                numberComma(params.row.trenchNewIncremental)
              )
            }
          },
          {
            "title": "占比%",
            "key": "proportion",
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
        selectBolA: false,
        selectBolB: false,
        updateText: ''
      }
    },
    mounted() {
      const _self = this;
      getDitchOrganizationApi(res => {
        _self.a = res.branchList;
        _self.d = res.typeList;
        let {role, branch, gridding} = JSON.parse(localStorage.getItem('role'));
        switch (role) {
          case 1:
            this._getListFn();
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
      });
    },
    methods: {
      _getListFn() {
        const _self = this;
        _self.tBody = [];
        getDitchCapacityApi({
          branch: _self.branch,
          gridding: _self.gridding,
          managerAccount: _self.managerAccount,
          type: _self.type
        }, res => {
          _self.updateText = res.description;
          let haveArr = [];
          res.data.forEach(items => {
            haveArr.indexOf(items.name) < 0 ? haveArr.push(items.name) : items.name = '';
          });
          _self.tBody = [...res.data, {
            isFooter: true,
            name: '合计',
            trenchType: '-',
            monthNewIncremental: res.statistics.monthNewIncremental,
            trenchNewIncremental: res.statistics.trenchNewIncremental,
            proportion: res.statistics.proportion,
            monthChainRelativeRatio: res.statistics.monthChainRelativeRatio
          }];
          _self.columns[0].fixed = 'left';
        });
      },
      _changeA() {
        const _self = this;
        _self.a.forEach(items => {
          if (items.name === _self.branch) {
            _self.b = items.griddings;
          }
        });
        let {role} = JSON.parse(localStorage.getItem('role'));
        if (role === 1) {
          _self.gridding = '';
          _self.managerAccount = '';
        }
        _self._getListFn();
      },
      _changeB() {
        const _self = this;
        _self.managerAccount = '';
        _self.b.forEach(items => {
          if (items.name === _self.gridding) {
            _self.c = items.managers
          }
        });
        _self._getListFn();
      },
      _changeC () {
        this.hasNext = this.managerAccount !== '';
        this._getListFn();
      },
      _toDetail (type) {
        let { branch, gridding, managerAccount } = this;
        let { path } = this.$route;
        this.$router.push(`${path}/${branch}/${gridding}/${managerAccount}/${type}`);
      }
    }
  }
</script>

<style scoped lang="less">
  .capacity-wrap {
    display: flex;
    flex-direction: column;
    
    .capacity-search-wrap {
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
    
    .capacity-view-wrap {
      flex: 1;
    }
  }
</style>
