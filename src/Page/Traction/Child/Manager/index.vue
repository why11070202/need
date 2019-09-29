<template>
  <div class="manager-wrap common-width">
    <headers showRight/>

    <div class="top-date-wrap">
      <div class="year-wrap" @click="show = true">{{year}}年</div>
      <div class="month-wrap">
        <top-bar :data="barData" @barClick="_barClick"/>
      </div>
    </div>

    <div class="title-wrap" v-text="_setTitle"></div>

    <div class="next-content-wrap">
      <div class="table-wrap">
        <table>
          <thead>
          <tr border="0">
            <th v-for="item in tHead" v-html="item"></th>
          </tr>
          </thead>
        </table>
        <b-scroll>
          <table class="content-table">
            <thead class="hide-header">
            <tr border="0">
              <th v-for="item in tHead" v-html="item"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!$store.state.isLoading && tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(items, index) in tBody" :key="index">

              <td
                :class="{'can-click': items.canClick}"
                v-for="(item, key) in items.text"
                :key="key"
                v-html="item"
                @click="_trClick(items, key)">
              </td>
            </tr>
            </tbody>
          </table>
        </b-scroll>
      </div>
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
        year: this.$route.params.month.split('-')[0],
        month: '',
        barData: [],
        tHead: [],
        tBody: [],
        tFoot: [],
        isLinkNumberMin: 0,
        isLinkNumberMax: 100,
        show: false,
        columns: []
      }
    },
    computed: {
      _setTitle() {
        return `${this.$route.params.street} ${this.month}月 销售收入考核进度表(万元)`;
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
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        this.year = value;
        this.onCancel();
      },
      _trClick(obj, n) {
        if (n && obj.canClick) {
          if (obj.text[n] === '-') {
            return
          }
          const _self = this;
          let {type, name, street} = _self.$route.params;
          localStorage.setItem('name', obj.account);
          let _incomeItem = _self.tHead[n].replace(/\//g, '-').replace(/%/g, '@');
          _self.$router.push(`/menu/traction/${_self.year}-${_self.month}/${type}/${name}/grid/${street}/manager/${obj.name}/${_incomeItem}`);
        }
      },
      _barClick(obj) {
        if (obj) {
          this.month = obj.str;
        }
      },
      _getApi() {
        const _self = this;
        let roleData = JSON.parse(localStorage.getItem('role'));
        _self.$post('/incomeconstituent/findSalesManagerIncomeConstituent', {
          month: `${_self.year}-${_self.month}`,
          branch: _self.$route.params.name,
          gridding: _self.$route.params.street
        }).then(res => {
          _self.tHead = [res.boxhead, ...res.incomeItemList];
          _self.tBody = [];
          res.data.forEach(items => {
            let obj = {
              name: items.name,
              account: items.account,
              text: [
                items.name,
                ...items.itemList.map(it => (numberComma(it.complete)))
              ]
            };
            if (roleData.role === 3) {
              if (items.account === localStorage.getItem('name')) {
                obj.canClick = true;
              } else {
                obj.canClick = false;
              }
            } else {
              obj.canClick = true;
            }
            _self.tBody.push(obj);
          });
          _self.tFoot = [
            '合计',
            ...res.statistics.itemList.map(it => (numberComma(it.complete)))
          ];
        })
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
  @import "../../../../Common/Less/index";

  .manager-wrap {
    display: flex;
    flex-direction: column;

    .next-content-wrap {
      flex: 1;
      position: relative;

      .table-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        padding: 10px 10px 40px 10px;

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: @font-12;
          text-align: center;
          border: 1px solid @border-color;

          &.content-table {
            border-top: 0;
          }

          thead {
            display: table-header-group;
            position: relative;

            &.hide-header {
              display: none;
            }

            tr {
              th {
                height: 40px;
                padding: 0 5px;
                border-right: 1px solid @border-color;
                font-weight: normal;
                font-size: 12px;

                &:last-child {
                  border-right: 0;
                }
              }
            }
          }

          tbody {
            display: table-header-group;

            tr {
              td {
                height: 40px;
                padding: 0 5px;
                border-bottom: 1px solid @border-color;
                border-right: 1px solid @border-color;
                word-wrap: break-word;
              }

              &:last-child {
                td {
                  border-bottom: 0;
                }
              }
            }
          }
        }

        .can-click {
          color: @table-header-color;
          cursor: pointer;
          user-select: none;

          &:first-child {
            color: @text-color;
          }
        }
      }
    }
  }
</style>
