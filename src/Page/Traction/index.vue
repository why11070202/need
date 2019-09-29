<template>
  <div class="traction-wrap common-width">
    <headers showRight/>
    <div class="top-date-wrap">
      <div class="year-wrap" @click="show = true">{{year}}年</div>
      <div class="month-wrap">
        <top-bar :data="barData" @barClick="_barClick" ref="vbar1"/>
      </div>
    </div>
    
    <div class="tabs-wrap">
      <div class="tabs-items" :class="{'active': tabsIndex === 0}" @click="_changeTabs(0)">全量收入</div>
      <div class="tabs-items" :class="{'active': tabsIndex === 1}" @click="_changeTabs(1)">销售收入</div>
    </div>
    
    <div class="title-wrap" v-text="title"></div>
    
    <div class="next-content-wrap">
      <v-table
        seniority
        :tHeader="tHead"
        :tBody="tBody"
        :tFoot="tFoot"
        :isLinkNumberMax="isLinkNumberMax"
        @trClick="_trClick"/>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import BScroll from 'Element/BScroll';
  import TopBar from 'Element/TopBar';
  import VTable from 'Element/VTable';
  import { numberComma } from 'Common/Js';
  
  export default {
    components: {
      Headers,
      BScroll,
      TopBar,
      VTable
    },
    data() {
      return {
        barData: [],
        tabsIndex: 0,
        month: '',
        title: '广州各公司全量收入考核进度表(万元)',
        tHead: ['分公司', '目标值', '完成值', '完成率', '排名'],
        tBody: [],
        tFoot: [],
        isLinkNumberMax: 1,
        year: new Date().getFullYear(),
        show: false,
        columns: []
      }
    },
    mounted() {
      const _self = this;
      let yearData = JSON.parse(localStorage.getItem('yearData')) || [];
      yearData.forEach((items, index) => {
        _self.columns.push(items.name);
        if (!index) {
          _self.barData = items.children;
        }
      });
      let { role, branch, gridding } = JSON.parse(localStorage.getItem('role'));
      if (role === 2) {
        _self.$router.replace(`/menu/traction/${_self.year}-${_self.month}/${_self.tabsIndex}/${branch}`);
      } else if (role === 3) {
        _self.$router.replace(`/menu/traction/${_self.year}-${_self.month}/${_self.tabsIndex}/${branch}/grid/${gridding}`);
      }
    },
    methods: {
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        this.year = value;
        this.onCancel();
      },
      _barClick(obj) {
        if (obj) {
          this.month = obj.str;
        }
      },
      _changeTabs(n) {
        if (n === 1) {
          this.title = "广州各公司销售收入考核进度表(万元)"
        } else {
          this.title = "广州各公司全量收入考核进度表(万元)"
        }
        if (this.tabsIndex === n) {
          return
        }
        this.tabsIndex = n;
        this._getApi();
      },
      _getApi() {
        const _self = this;
        let url = _self.tabsIndex ? '/incomecheckprogress/findSalesGroupByBranch' : '/incomecheckprogress/findAllGroupByBranch';
        _self.$post(url, {month: `${_self.year}-${_self.month}`}).then(res => {
          _self.tHead[0] = res.boxhead;
          _self.tBody = [];
          _self.tFoot = [
            '合计',
            numberComma(res.statistics.goal),
            numberComma(res.statistics.complete),
            `${numberComma(res.statistics.percentageComplete)}%`,
            ''
          ];
          res.data.forEach(items => {
            _self.tBody.push({
              name: items.name,
              text: [
                items.name,
                `${numberComma(items.goal)}`,
                `${numberComma(items.complete)}`,
                `${this._setColor(items.percentageComplete, items.timeProgressType)}`,
                items.ranking
              ]
            })
          });
        })
      },
      _trClick(obj) {
        const { year, month, tabsIndex } = this;
        this.$router.push(`/menu/traction/${year}-${month}/${tabsIndex}/${obj.name}`);
      },
      _setColor(n, i) {
        if (i === 1) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color green-color"></i><span class="green-color">${numberComma(n)}%</span>`;
        } else if (i === 2) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color yellow-color"></i><span class="yellow-color">${numberComma(n)}%</span>`;
        } else if (i === 3) {
          if (!n) {
            return '-';
          }
          return `<i class="icon-color red-color"></i><span class="red-color">${numberComma(n)}%</span>`;
        }
      }
    },
    watch: {
      month() {
        this._getApi();
      },
      year(newValue, oldValue) {
        const _self = this;
        if (newValue !== oldValue && oldValue !== '') {
          let yearData = JSON.parse(localStorage.getItem('yearData')) || [];
          yearData.forEach((items) => {
            if (items.name === newValue) {
              _self.barData = items.children;
            }
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  
  .traction-wrap {
    display: flex;
    flex-direction: column;
    
    .next-content-wrap {
      flex: 1;
      position: relative;
    }
  }
</style>
