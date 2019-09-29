<template>
  <div class="statement-warp common-width">
    <div class="table-wrap">
      <table>
        <thead>
        <tr border="0">
          <th>当前进度状态</th>
          <th>当前类型</th>
          <th>工单数量</th>
          <th>户数</th>
        </tr>
        </thead>
      </table>
      <b-scroll>
        <table class="content-table">
          <thead class="hide-header">
          <tr border="0">
            <th>当前进度状态</th>
            <th>当前类型</th>
            <th>工单数量</th>
            <th>户数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tBody.length === 0">
            <td class="not-date" colspan="4">没有数据</td>
          </tr>
          <tr v-else v-for="(item, index) in tBody" :key="index">
            <td>{{item.progressStatus}}</td>
            <td>{{item.workOrderType}}</td>
            <td>{{item.workOrderNum}}</td>
            <td>{{item.houseHolds}}</td>
          </tr>
          </tbody>
        </table>
      </b-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "Element/BScroll";
  
  export default {
    components: {
      BScroll
    },
    data() {
      return {
        tBody: []
      };
    },
    mounted() {
      this.queryList();
    },
    methods: {
      queryList() {
        const _self = this;
        _self.$newpost("/coveredInAdvance/statisticCoveredInAdvance", {
          "pageNum": 1,
          "pageSize": 9999
        }).then(res => {
          _self.tBody = [...res.data];
        });
      }
    }
  };
</script>

<style lang='less' scoped>
  @import "../../../Common/Less/index";
  
  .statement-warp {
    padding: 10px;
    padding-top: 0;
    position: relative;
    
    .title {
      text-align: center;
      margin-bottom: 15px;
      
      span {
        display: inline-block;
        padding: 5px 15px;
        background: #efefef;
        border-radius: 8px;
        color: #505050;
        font-size: @font-12;
      }
    }
    
    .search-wrap {
      display: flex;
      
      span {
        display: inline-block;
        width: 150px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border-radius: 5px;
        
        &.search-title {
          background: #d5e8f5;
          color: #4a545a;
        }
      }
    }
    
    .table-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding-bottom: 40px;
      margin-top: 10px;
      
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
              // text-align: center;
              &:first-child {
                text-align: cneter;
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
</style>
