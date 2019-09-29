<template>
  <div class="my-table-wrap" v-if="tHeader.length">
    <div class="table-wrap">
      <table>
        <thead>
          <tr border="0">
            <th
              v-for="(items, index) in tHeader"
              :key="index"
              :class="{'can-click': _setHeaderCanClick(index), 'seniority': seniority && index === tHeader.length - 1}"
              v-html="items"
              @click="tHeadClick(index)">
            </th>
          </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
            <tr>
              <th
                v-for="(items, index) in tHeader"
                :key="index"
                :class="{'seniority': seniority && index === tHeader.length - 1}"
                v-html="items">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!$store.state.isLoading && !tBody.length">
              <td class="not-date" :colspan="tHeader.length">没有数据</td>
            </tr>
            <tr v-else v-for="(items, index) in tBody" :key="index">
              <td
                v-for="(item, key) in items.text"
                :key="key"
                :class="{'can-click': _setCanClick(index, key), 'seniority': seniority && key === tHeader.length - 1}"
                v-html="item"
                @click="tdClick($event, items, key)">
              </td>
            </tr>
          </tbody>
          <tfoot v-if="tFoot.length && tBody.length">
            <tr>
              <td v-for="(item, key) in tFoot" :key="key" v-text="item"></td>
            </tr>
          </tfoot>
        </table>
      </b-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';

  export default {
    components: {
      BScroll
    },
    props: {
      seniority: {
        type: Boolean,
        default: false
      },
      clickHeade: {
        type: Boolean,
        default: false
      },
      clickHeaderNumber: {
        type: Number/Array,
        default: null
      },
      tHeader: {
        type: Array,
        default: () => []
      },
      tBody: {
        type: Array,
        default: () => []
      },
      isLinkNumberMin: {
        type: Number,
        default: -1
      },
      isLinkNumberMax: {
        type: Number,
        default: 0
      },
      tFoot: {
        type: Array,
        default: () => []
      },
      activeArr: {
        type: Array,
        default: () => []
      },
      moreCanClick: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      _setHeaderCanClick() {
        return function (n) {
          let bol = false;
          if (this.clickHeaderNumber && this.clickHeaderNumber.indexOf(n) > -1) {
            bol = true
          }
          return bol;
        }
      },
      _setCanClick() {
        return function (index, key) {
          let bol = false;
          if (this.moreCanClick.length) {
            if (this.moreCanClick.indexOf(key) > -1) {
              bol = true;
            }
          } else {
            if (this.isLinkNumberMin < key && key < this.isLinkNumberMax) {
              if (this.activeArr.length) {
                if (this.activeArr.indexOf(this.tBody[index].text[key]) > -1) {
                  bol = true;
                } else {
                  bol = false;
                }
              } else {
                bol = true;
              }
            }
          }
          return bol;
        }
      }
    },
    methods: {
      tHeadClick(n) {
        if (this.clickHeade && this.clickHeaderNumber.indexOf(n) > -1) {
          this.$emit('headClick', n);
        }
      },
      tdClick(e, obj, n) {
        if (this.moreCanClick.length) {
          if (this.moreCanClick.indexOf(n) > -1) {
            this.$emit('trClick', obj, n);
          }
        } else if (n < this.isLinkNumberMax) {
          if (e.target.className === 'can-click') {
            if (obj.text[n] === '-') {
              return
            }
            this.$emit('trClick', obj, n);
          }
        }
      }
    },
    watch: {
      tHeader (val) {
        this.tHeader = val;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../Less/index.less";

  .my-table-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0 10px 10px;

    .table-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding-bottom: 50px;

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
              border-right: 1px solid @border-color;
              font-weight: normal;
              font-size: @font-12;
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
              border-bottom: 1px solid @border-color;
              border-right: 1px solid @border-color;
              font-size: @font-12;

              &:last-child {
                border-right: 0;
              }

              &.not-date {
                height: 80px;
                color: @not-data-color;
              }
            }

            &.can-click {
              .td {
                color: @table-header-color;
              }
            }

            &:last-child {
              td {
                border-bottom: 0;
              }
            }
          }
        }

        tfoot {
          tr {
            td {
              height: 40px;
              padding: 0 5px;
              border-top: 1px solid @border-color;
              border-right: 1px solid @border-color;
              font-size: @font-12;
              color: #210694;
            }
          }
        }

        .can-click {
          color: @table-header-color;
          cursor: pointer;
          user-select: none;
        }

        .seniority {
          width: 40px;
        }
      }
    }
  }
</style>
