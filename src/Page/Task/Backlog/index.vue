<template>
  <div class="backlog-wrap common-width">
    <div class="backlog-content-wrap">
      <div class="table-wrap">
        <table>
          <thead>
            <tr border="0">
              <th>协同内容</th>
              <th width="55">发起人</th>
              <th width="80">创建时间</th>
              <th width="50">操作</th>
            </tr>
          </thead>
        </table>
        <b-scroll>
          <table class="content-table">
            <thead class="hide-header">
              <tr border="0">
                <th>协同内容</th>
                <th width="55">发起人</th>
                <th width="80">创建时间</th>
                <th width="50">操作</th>
              </tr>
            </thead>
            <tbody>
            <tr v-if="tBody.length === 0">
              <td class="not-date" colspan="5">没有数据</td>
            </tr>
            <tr v-else v-for="(item, index) in tBody" :key="index">
              <td v-text="item.issue"></td>
              <td width="55" v-text="item.initiatorName"></td>
              <td width="80" v-text="item.time"></td>
              <td width="50" class="do" @click="_doSome(item)">处理</td>
            </tr>
            </tbody>
          </table>
        </b-scroll>
      </div>
    </div>

    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'Element/BScroll';
  import {formatDate} from 'Common/Js';

  export default {
    components: {
      BScroll,
    },
    data() {
      return {
        tBody: []
      }
    },
    mounted() {
      localStorage.removeItem('removeSendData');
      this._getApi();
    },
    methods: {
      _getApi() {
        const _self = this;
        _self.$post('/synergyorder/findBacklog', {
          pageNum: 1,
          pageSize: 9999
        }).then(res => {
          _self.tBody = [];
          res.data.forEach(items => {
            items.time = formatDate(items.createTime, true);
            _self.tBody.push(items)
          });
        })
      },
      _doSome(obj) {
        localStorage.setItem('sendData', JSON.stringify(obj));
        this.$router.push(`/menu/task/synergy/${obj.id}`);
      }
    },
    watch: {
      '$route'(to, from) {
      
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../Common/Less/index.less";

  .backlog-wrap {
    .backlog-content-wrap {
      width: 100%;
      height: 100%;
      padding: 10px;

      .table-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        padding-bottom: 40px;

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
            background: @table-header-bg-color;
            color: #6da8a2;

            &.hide-header {
              display: none;
            }

            tr {
              th {
                height: 35px;
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

                &:first-child {
                  text-align: left;
                }

                &.see {
                  color: @see-color;
                }

                &.error {
                  color: @active-color;
                }

                &.do {
                  color: @do-color;
                }

                &:last-child {
                  border-right: 0;
                }

                &.not-date {
                  height: 80px;
                  color: @not-data-color;
                  text-align: center;
                }
              }

              &:last-child {
                td {
                  border-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

