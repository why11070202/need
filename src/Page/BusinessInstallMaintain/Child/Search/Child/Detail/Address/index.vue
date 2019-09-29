<template>
  <div class="search-order-detail-wrap common-width">
    <div class="table-wrap">
      <table class="header-table">
        <thead>
        <tr border="0">
          <th>标准地址：</th>
        </tr>
        </thead>
      </table>
      <div class="table-scroll-wrap">
        <b-scroll :pullup="true" @scrollToEnd="_scrollEnd">
          <table class="content-table">
            <thead class="hide-header">
              <tr border="0">
                <th>标准地址：</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tBody.length === 0">
                <td class="not-date" colspan="5">没有数据</td>
              </tr>
              <tr v-else v-for="(item, index) in tBody" :key="index">
                <td class="can-click" v-text="item.standardAddress" @click="_trClick(item)"></td>
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
  import { getReportWorkOrderStatusApi } from "../../../../../../../Fetch/business";
  
  export default {
    components: {
      BScroll
    },
    data() {
      return {
        tBody: [],
        pageNum: 0,
        total: 0
      }
    },
    mounted() {
      this.pageNum += 1;
    },
    methods: {
      _trClick (obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/${obj.crmWorkNum}`);
      },
      _scrollEnd() {
        if (this.pageNum < this.total) {
          this.pageNum += 1;
        }
      },
      _getListFn() {
        const _self = this;
        getReportWorkOrderStatusApi({
          address: _self.$route.params.address,
          customerType: _self.$route.params.type,
          pageNum: _self.pageNum,
          pageSize: _self.pageSize,
          workOrderStatus: _self.$route.params.status
        }, res => {
          _self.total = res.totalPage;
          _self.tBody = [..._self.tBody.splice(0), ...res.data];
        });
      }
    },
    watch: {
      pageNum() {
        this._getListFn();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../../../../Common/Less/index";
  
  .search-order-detail-wrap {
    .table-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding: 0 10px 10px;
      display: flex;
      flex-direction: column;
    
      .table-scroll-wrap {
        flex: 1;
      }
    
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
            
              &.see {
                color: @see-color;
              }
  
              &.can-click {
                color: @table-header-color;
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
</style>
