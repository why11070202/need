<template>
  <div class="traction-wrap common-width">
    <headers showRight/>
    <div class="top-date-wrap">
      <div class="year-wrap" @click="show = true">{{year}}年</div>
      <div class="month-wrap">
        <top-bar :data="barData" @barClick="_barClick"/>
      </div>
    </div>
    <div class="tabs-wrap">
      <div class="tabs-items" :class="{'active': tabsIndex === 0}" @click="_changeTabs(0)">全量收入</div>
      <div class="tabs-items" :class="{'active': tabsIndex === 1}" @click="_changeTabs(1)">销售收入</div>
    </div>
    <div class="title-wrap" v-text="_setTitle"></div>
    <div class="next-content-wrap">
      <v-table
        seniority
        clickHeade
        :clickHeaderNumber="[0]"
        :tHeader="tHead"
        :tBody="tBody"
        :tFoot="tFoot"
        @headClick="_trClick"/>
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
  import {numberComma} from 'Common/Js';

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
        tabsIndex: Number(this.$route.params.type),
        year: this.$route.params.month.split('-')[0],
        month: '',
        tHead: ['', '目标值', '完成值', '完成率', '排名'],
        tBody: [],
        tFoot: [],
        show: false,
        columns: []
      }
    },
    computed: {
      _setTitle() {
        let str = '';
        if (this.tabsIndex) {
          str = `${this.$route.params.name}销售收入考核进度表(万元)`;
        } else {
          str = `${this.$route.params.name}全量收入考核进度表(万元)`;
        }
        return str;
      }
    },
    mounted() {
      const _self = this;
      let yearData = JSON.parse(localStorage.getItem('yearData'));
      if (yearData.length) {
        yearData.forEach(items => {
          _self.columns.push(items.name);
          if (items.name === _self.year) {
            _self.barData = items.children.map(item => {
              if (item.str === _self.$route.params.month.split('-')[1]) {
                item.active = true
              }
              return item;
            });
          }
        })
      }
    },
    methods: {
      onCancel () {
        this.show = false;
      },
      onConfirm (value) {
        this.year = value;
        this.onCancel();
      },
      _barClick(obj) {
        if (obj) {
          this.month = obj.str;
        }
      },
      _changeTabs(n) {
        if (this.tabsIndex === n) {
          return
        }
        this.tabsIndex = n;
        this._getApi();
      },
      _getApi() {
        const _self = this;
        let url = _self.tabsIndex ? '/incomecheckprogress/findSalesGroupByGridding' : '/incomecheckprogress/findAllGroupByGridding';
        _self.$post(url, {
          month: `${_self.year}-${_self.month}`,
          branch: _self.$route.params.name
        }).then(res => {
          _self.tHead[0] = res.boxhead;
          _self.tBody = [];
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
          })
        })
      },
      _trClick() {
        const { name } = this.$route.params;
        const {year, month, tabsIndex} = this;
        this.$router.push(`/menu/traction/${year}-${month}/${tabsIndex}/${name}/grid`);
      },
      _setColor (n, i) {
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
        if (newValue !== oldValue) {
          let yearData = JSON.parse(localStorage.getItem('yearData'));
          yearData.forEach(items => {
            if (items.name === newValue) {
              _self.year = items.name;
              _self.barData = items.children;
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index.less";

  .traction-wrap {
    .next-content-wrap {
      height: calc(100% - 160px);
      position: relative;
    }
  }
</style>
