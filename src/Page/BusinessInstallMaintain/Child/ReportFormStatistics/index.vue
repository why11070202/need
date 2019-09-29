<template>
  <div class="report-form-statistics-wrap common-width">
    <b-scroll>
      <div class="table-wrap" v-if="tBody.length">
        <table>
          <thead>
          <tr border="0">
            <th>工单状态</th>
            <th>客户类型</th>
            <th>工单数量</th>
          </tr>
          </thead>
        </table>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tBody" :key="index" @click="_trClick(item)" v-if='item.customerType==="个人客户"'>
              <td class="can-click">{{item.workOrderStatus}}</td>
              <td class="can-click">{{item.customerType}}</td>
              <td class="can-click">{{item.workOrderNum}}</td>
            </tr>
          </tbody>
        </table>
        <table style='margin-top:10px'>
          <thead>
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
        </table>
        <table class="content-table">
          <thead class="hide-header">
            <tr border="0">
              <th>工单状态</th>
              <th>客户类型</th>
              <th>工单数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tBody" :key="index" @click="_trClick(item)" v-if="item.customerType==='商业客户'">
              <td class="can-click">{{item.workOrderStatus}}</td>
              <td class="can-click">{{item.customerType}}</td>
              <td class="can-click">{{item.workOrderNum}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-scroll>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from "Element/Headers";
  import BScroll from "Element/BScroll";
  import { getReportListApi } from "../../../../Fetch/business";
  
  export default {
    components: {
      Headers,
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
      _trClick(obj) {
        let { path } = this.$route;
        this.$router.push(`${path}/${obj.customerType}/${obj.workOrderStatus}`);
      },
      _getList () {
        const _self = this;
        getReportListApi({
          pageNum: _self.pageNum,
          pageSize: _self.pageSize
        }, res => {
          _self.tBody = [..._self.tBody.map(items => (items)), ...res]
        })
      }
    },
    watch: {
      pageNum () {
        this._getList();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../../Common/Less/index";
  
  .report-form-statistics-wrap {
    .table-wrap {
      height: 100%;
      padding: 0 10px 20px 10px;
      overflow: hidden;
      position: relative;
    
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
              border-top: 1px solid @border-color;
              border-bottom: 1px solid @border-color;
              border-right: 1px solid @border-color;
              word-wrap: break-word;
              // text-align: center;
              &:first-child {
                text-align: center;
              }
            
              &.can-click {
                color: @table-header-color;
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
          
            &:first-child {
              td {
                border-top: 0;
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
