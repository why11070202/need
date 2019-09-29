<template>
  <div class="grid-wrap common-width">
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
        :tHeader="tHead"
        :tBody="tBody"
        :tFoot="tFoot"
        :activeArr="activeArr"
        v-if="tabsIndex"
        :isLinkNumberMax="isLinkNumberMax"
        @trClick="_trClick"/>
      <v-table :tHeader="tHead" :tBody="tBody" :tFoot="tFoot" v-else/>
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
        tHead: [],
        tBody: [],
        tFoot: [],
        activeArr: [],
        isLinkNumberMax: 1,
        show: false,
        columns: []
      }
    },
    computed: {
      _setTitle() {
        let str = '';
        if (this.tabsIndex) {
          str = `${this.$route.params.name} ${this.month}月 销售收入考核进度表(万元)`;
        } else {
          str = `${this.$route.params.name} ${this.month}月 全量收入考核进度表(万元)`;
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
        let url = _self.tabsIndex ? '/incomeconstituent/findSalesIncomeConstituent' : '/incomeconstituent/findAllIncomeConstituent';
        _self.$post(url, {
          month: `${_self.year}-${_self.month}`,
          branch: _self.$route.params.name
        }).then(res => {
          this.tHead = [res.boxhead, ...res.incomeItemList];
          _self.tBody = [];
          let roleData = JSON.parse(localStorage.getItem('role'));
          if (roleData.role === 2) {
            _self.activeArr = [roleData.gridding]
          } else if (roleData.role === 3) {
            _self.activeArr = [roleData.gridding, roleData.field]
          }
          res.data.forEach(items => {
            if (_self.tabsIndex) {
              _self.tBody.push({
                name: items.name,
                text: [
                  items.name,
                  ...items.incomeCompleteList.map(items => (numberComma(items)))
                ]
              });
              _self.tFoot = [
                '合计',
                ...res.statistics.incomeCompleteList.map(items => (numberComma(items)))
              ];
            } else {
              _self.tBody.push({
                name: items.name,
                text: [
                  items.name,
                  ...items.incomeCompleteList.map(items => (numberComma(items)))
                ]
              });
              _self.tFoot = [
                '合计',
                ...res.statistics.incomeCompleteList.map(items => (numberComma(items)))
              ];
            }
          })
        })
      },
      _trClick(obj) {
        let {type, name} = this.$route.params;
        this.$router.push(`/menu/traction/${this.year}-${this.month}/${type}/${name}/grid/${obj.name}`)
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

  .grid-wrap {
    display: flex;
    flex-direction: column;

    .next-content-wrap {
      flex: 1;
      position: relative;
    }
  }
</style>
